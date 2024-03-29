function getGlobal() {
    return function () {
        return this.dust
    }.call(null)
}

var dust = {};
(function (dust) {
    function Context(e, t, n) {
        this.stack = e, this.global = t, this.blocks = n
    }

    function Stack(e, t, n, r) {
        this.tail = t, this.isObject = !dust.isArray(e) && e && typeof e == "object", this.head = e, this.index = n, this.of = r
    }

    function Stub(e) {
        this.head = new Chunk(this), this.callback = e, this.out = ""
    }

    function Stream() {
        this.head = new Chunk(this)
    }

    function Chunk(e, t, n) {
        this.root = e, this.next = t, this.data = [], this.flushable = !1, this.taps = n
    }

    function Tap(e, t) {
        this.head = e, this.tail = t
    }

    dust.helpers = {}, dust.cache = {}, dust.register = function (e, t) {
        if (!e) return;
        dust.cache[e] = t
    }, dust.render = function (e, t, n) {
        var r = (new Stub(n)).head;
        dust.load(e, r, Context.wrap(t, e)).end()
    }, dust.stream = function (e, t) {
        var n = new Stream;
        return dust.nextTick(function () {
            dust.load(e, n.head, Context.wrap(t, e)).end()
        }), n
    }, dust.renderSource = function (e, t, n) {
        return dust.compileFn(e)(t, n)
    }, dust.compileFn = function (e, t) {
        var n = dust.loadSource(dust.compile(e, t));
        return function (e, r) {
            var i = r ? new Stub(r) : new Stream;
            return dust.nextTick(function () {
                n(i.head, Context.wrap(e, t)).end()
            }), i
        }
    }, dust.load = function (e, t, n) {
        var r = dust.cache[e];
        return r ? r(t, n) : dust.onLoad ? t.map(function (t) {
            dust.onLoad(e, function (r, i) {
                if (r) return t.setError(r);
                dust.cache[e] || dust.loadSource(dust.compile(i, e)), dust.cache[e](t, n).end()
            })
        }) : t.setError(new Error("Template Not Found: " + e))
    }, dust.loadSource = function (source, path) {
        return eval(source)
    }, Array.isArray ? dust.isArray = Array.isArray : dust.isArray = function (e) {
        return Object.prototype.toString.call(e) == "[object Array]"
    }, dust.nextTick = function () {
        return typeof process != "undefined" ? process.nextTick : function (e) {
            setTimeout(e, 0)
        }
    }(), dust.isEmpty = function (e) {
        return dust.isArray(e) && !e.length ? !0 : e === 0 ? !1 : !e
    }, dust.filter = function (e, t, n) {
        if (n) for (var r = 0, i = n.length; r < i; r++) {
            var s = n[r];
            s === "s" ? t = null : typeof dust.filters[s] == "function" && (e = dust.filters[s](e))
        }
        return t && (e = dust.filters[t](e)), e
    }, dust.filters = {
        h: function (e) {
            return dust.escapeHtml(e)
        }, j: function (e) {
            return dust.escapeJs(e)
        }, u: encodeURI, uc: encodeURIComponent, js: function (e) {
            return JSON ? JSON.stringify(e) : e
        }, jp: function (e) {
            return JSON ? JSON.parse(e) : e
        }
    }, dust.makeBase = function (e) {
        return new Context(new Stack, e)
    }, Context.wrap = function (e, t) {
        if (e instanceof Context) return e;
        var n = {};
        return n.__templates__ = [], n.__templates__.push(t), new Context(new Stack(e), n)
    }, Context.prototype.get = function (e) {
        var t = this.stack, n;
        while (t) {
            if (t.isObject) {
                n = t.head[e];
                if (n !== undefined) return n
            }
            t = t.tail
        }
        return this.global ? this.global[e] : undefined
    }, Context.prototype.getPath = function (e, t) {
        var n = this.stack, r, i = t.length, s = e ? undefined : this.stack.tail;
        if (e && i === 0) return n.head;
        n = n.head;
        var o = 0;
        while (n && o < i) {
            r = n, n = n[t[o]], o++;
            while (!n && !e) {
                if (o > 1) return undefined;
                s ? (n = s.head, s = s.tail, o = 0) : e || (n = this.global, e = !0, o = 0)
            }
        }
        return typeof n == "function" ? function () {
            return n.apply(r, arguments)
        } : n
    }, Context.prototype.push = function (e, t, n) {
        return new Context(new Stack(e, this.stack, t, n), this.global, this.blocks)
    }, Context.prototype.rebase = function (e) {
        return new Context(new Stack(e), this.global, this.blocks)
    }, Context.prototype.current = function () {
        return this.stack.head
    }, Context.prototype.getBlock = function (e, t, n) {
        typeof e == "function" && (e = e(t, n).data.join(""), t.data = []);
        var r = this.blocks;
        if (!r) return;
        var i = r.length, s;
        while (i--) {
            s = r[i][e];
            if (s) return s
        }
    }, Context.prototype.shiftBlocks = function (e) {
        var t = this.blocks, n;
        return e ? (t ? n = t.concat([e]) : n = [e], new Context(this.stack, this.global, n)) : this
    }, Stub.prototype.flush = function () {
        var e = this.head;
        while (e) {
            if (!e.flushable) {
                if (e.error) {
                    this.callback(e.error), this.flush = function () {
                    };
                    return
                }
                return
            }
            this.out += e.data.join(""), e = e.next, this.head = e
        }
        this.callback(null, this.out)
    }, Stream.prototype.flush = function () {
        var e = this.head;
        while (e) {
            if (!e.flushable) {
                if (e.error) {
                    this.emit("error", e.error), this.flush = function () {
                    };
                    return
                }
                return
            }
            this.emit("data", e.data.join("")), e = e.next, this.head = e
        }
        this.emit("end")
    }, Stream.prototype.emit = function (e, t) {
        if (!this.events) return !1;
        var n = this.events[e];
        if (!n) return !1;
        if (typeof n == "function") n(t); else {
            var r = n.slice(0);
            for (var i = 0, s = r.length; i < s; i++) r[i](t)
        }
    }, Stream.prototype.on = function (e, t) {
        return this.events || (this.events = {}), this.events[e] ? typeof this.events[e] == "function" ? this.events[e] = [this.events[e], t] : this.events[e].push(t) : this.events[e] = t, this
    }, Stream.prototype.pipe = function (e) {
        return this.on("data", function (t) {
            e.write(t, "utf8")
        }).on("end", function () {
            e.end()
        }).on("error", function (t) {
            e.error(t)
        }), this
    }, Chunk.prototype.write = function (e) {
        var t = this.taps;
        return t && (e = t.go(e)), this.data.push(e), this
    }, Chunk.prototype.end = function (e) {
        return e && this.write(e), this.flushable = !0, this.root.flush(), this
    }, Chunk.prototype.map = function (e) {
        var t = new Chunk(this.root, this.next, this.taps), n = new Chunk(this.root, t, this.taps);
        return this.next = n, this.flushable = !0, e(n), t
    }, Chunk.prototype.tap = function (e) {
        var t = this.taps;
        return t ? this.taps = t.push(e) : this.taps = new Tap(e), this
    }, Chunk.prototype.untap = function () {
        return this.taps = this.taps.tail, this
    }, Chunk.prototype.render = function (e, t) {
        return e(this, t)
    }, Chunk.prototype.reference = function (e, t, n, r) {
        if (typeof e == "function") {
            e.isFunction = !0, e = e.apply(t.current(), [this, t, null, {auto: n, filters: r}]);
            if (e instanceof Chunk) return e
        }
        return dust.isEmpty(e) ? this : this.write(dust.filter(e, n, r))
    }, Chunk.prototype.section = function (e, t, n, r) {
        if (typeof e == "function") {
            e = e.apply(t.current(), [this, t, n, r]);
            if (e instanceof Chunk) return e
        }
        var i = n.block, s = n["else"];
        r && (t = t.push(r));
        if (dust.isArray(e)) {
            if (i) {
                var o = e.length, u = this;
                if (o > 0) {
                    t.stack.head && (t.stack.head.$len = o);
                    for (var a = 0; a < o; a++) t.stack.head && (t.stack.head.$idx = a), u = i(u, t.push(e[a], a, o));
                    return t.stack.head && (t.stack.head.$idx = undefined, t.stack.head.$len = undefined), u
                }
                if (s) return s(this, t)
            }
        } else if (e === !0) {
            if (i) return i(this, t)
        } else if (e || e === 0) {
            if (i) return i(this, t.push(e))
        } else if (s) return s(this, t);
        return this
    }, Chunk.prototype.exists = function (e, t, n) {
        var r = n.block, i = n["else"];
        if (!dust.isEmpty(e)) {
            if (r) return r(this, t)
        } else if (i) return i(this, t);
        return this
    }, Chunk.prototype.notexists = function (e, t, n) {
        var r = n.block, i = n["else"];
        if (dust.isEmpty(e)) {
            if (r) return r(this, t)
        } else if (i) return i(this, t);
        return this
    }, Chunk.prototype.block = function (e, t, n) {
        var r = n.block;
        return e && (r = e), r ? r(this, t) : this
    }, Chunk.prototype.partial = function (e, t, n) {
        var r;
        t.global && t.global.__templates__ && t.global.__templates__.push(e), n ? (r = dust.makeBase(t.global), r.blocks = t.blocks, t.stack && t.stack.tail && (r.stack = t.stack.tail), r = r.push(n), r = r.push(t.stack.head)) : r = t;
        var i;
        return typeof e == "function" ? i = this.capture(e, r, function (e, t) {
            dust.load(e, t, r).end()
        }) : i = dust.load(e, this, r), t.global && t.global.__templates__ && t.global.__templates__.pop(), i
    }, Chunk.prototype.helper = function (e, t, n, r) {
        return dust.helpers[e] ? dust.helpers[e](this, t, n, r) : this
    }, Chunk.prototype.capture = function (e, t, n) {
        return this.map(function (r) {
            var i = new Stub(function (e, t) {
                e ? r.setError(e) : n(t, r)
            });
            e(i.head, t).end()
        })
    }, Chunk.prototype.setError = function (e) {
        return this.error = e, this.root.flush(), this
    }, Tap.prototype.push = function (e) {
        return new Tap(e, this)
    }, Tap.prototype.go = function (e) {
        var t = this;
        while (t) e = t.head(e), t = t.tail;
        return e
    };
    var HCHARS = new RegExp(/[&<>\"\']/), AMP = /&/g, LT = /</g, GT = />/g, QUOT = /\"/g, SQUOT = /\'/g;
    dust.escapeHtml = function (e) {
        return typeof e == "string" ? HCHARS.test(e) ? e.replace(AMP, "&amp;").replace(LT, "&lt;").replace(GT, "&gt;").replace(QUOT, "&quot;").replace(SQUOT, "&#39;") : e : e
    };
    var BS = /\\/g, FS = /\//g, CR = /\r/g, LS = /\u2028/g, PS = /\u2029/g, NL = /\n/g, LF = /\f/g, SQ = /'/g,
        DQ = /"/g, TB = /\t/g;
    dust.escapeJs = function (e) {
        return typeof e == "string" ? e.replace(BS, "\\\\").replace(FS, "\\/").replace(DQ, '\\"').replace(SQ, "\\'").replace(CR, "\\r").replace(LS, "\\u2028").replace(PS, "\\u2029").replace(NL, "\\n").replace(LF, "\\f").replace(TB, "\\t") : e
    }
})(dust), typeof exports != "undefined" && (typeof process != "undefined" && require("./server")(dust), module.exports = dust);
var dustCompiler = function (e) {
    function t(t) {
        var n = {};
        return e.filterNode(n, t)
    }

    function n(t, n) {
        var r = [n[0]];
        for (var i = 1, s = n.length; i < s; i++) {
            var o = e.filterNode(t, n[i]);
            o && r.push(o)
        }
        return r
    }

    function r(t, n) {
        var r = [n[0]], i;
        for (var s = 1, o = n.length; s < o; s++) {
            var u = e.filterNode(t, n[s]);
            u && (u[0] === "buffer" ? i ? i[1] += u[1] : (i = u, r.push(u)) : (i = null, r.push(u)))
        }
        return r
    }

    function s(e, t) {
        return ["buffer", i[t[1]]]
    }

    function o(e, t) {
        return t
    }

    function u() {
    }

    function a(t, n) {
        var r = {name: n, bodies: [], blocks: {}, index: 0, auto: "h"};
        return "(function(){dust.register(" + (n ? '"' + n + '"' : "null") + "," + e.compileNode(r, t) + ");" + f(r) + l(r) + "return body_0;" + "})();"
    }

    function f(e) {
        var t = [], n = e.blocks;
        for (var r in n) t.push("'" + r + "':" + n[r]);
        return t.length ? (e.blocks = "ctx=ctx.shiftBlocks(blocks);", "var blocks={" + t.join(",") + "};") : e.blocks = ""
    }

    function l(e) {
        var t = [], n = e.bodies, r = e.blocks;
        for (var i = 0, s = n.length; i < s; i++) t[i] = "function body_" + i + "(chk,ctx){" + r + "return chk" + n[i] + ";}";
        return t.join("")
    }

    function c(t, n) {
        var r = "";
        for (var i = 1, s = n.length; i < s; i++) r += e.compileNode(t, n[i]);
        return r
    }

    function h(t, n, r) {
        return "." + r + "(" + e.compileNode(t, n[1]) + "," + e.compileNode(t, n[2]) + "," + e.compileNode(t, n[4]) + "," + e.compileNode(t, n[3]) + ")"
    }

    e.compile = function (n, r) {
        try {
            var i = t(e.parse(n));
            return a(i, r)
        } catch (s) {
            throw!s.line || !s.column ? s : new SyntaxError(s.message + " At line : " + s.line + ", column : " + s.column)
        }
    }, e.filterNode = function (t, n) {
        return e.optimizers[n[0]](t, n)
    }, e.optimizers = {
        body: r,
        buffer: o,
        special: s,
        format: u,
        reference: n,
        "#": n,
        "?": n,
        "^": n,
        "<": n,
        "+": n,
        "@": n,
        "%": n,
        partial: n,
        context: n,
        params: n,
        bodies: n,
        param: n,
        filters: o,
        key: o,
        path: o,
        literal: o,
        comment: u
    }, e.pragmas = {
        esc: function (e, t, n, r) {
            var i = e.auto;
            t || (t = "h"), e.auto = t === "s" ? "" : t;
            var s = c(e, n.block);
            return e.auto = i, s
        }
    };
    var i = {s: " ", n: "\n", r: "\r", lb: "{", rb: "}"};
    e.compileNode = function (t, n) {
        return e.nodes[n[0]](t, n)
    }, e.nodes = {
        body: function (e, t) {
            var n = e.index++, r = "body_" + n;
            return e.bodies[n] = c(e, t), r
        }, buffer: function (e, t) {
            return ".write(" + p(t[1]) + ")"
        }, format: function (e, t) {
            return ".write(" + p(t[1] + t[2]) + ")"
        }, reference: function (t, n) {
            return ".reference(" + e.compileNode(t, n[1]) + ",ctx," + e.compileNode(t, n[2]) + ")"
        }, "#": function (e, t) {
            return h(e, t, "section")
        }, "?": function (e, t) {
            return h(e, t, "exists")
        }, "^": function (e, t) {
            return h(e, t, "notexists")
        }, "<": function (t, n) {
            var r = n[4];
            for (var i = 1, s = r.length; i < s; i++) {
                var o = r[i], u = o[1][1];
                if (u === "block") return t.blocks[n[1].text] = e.compileNode(t, o[2]), ""
            }
            return ""
        }, "+": function (t, n) {
            return typeof n[1].text == "undefined" && typeof n[4] == "undefined" ? ".block(ctx.getBlock(" + e.compileNode(t, n[1]) + ",chk, ctx)," + e.compileNode(t, n[2]) + ", {}," + e.compileNode(t, n[3]) + ")" : ".block(ctx.getBlock(" + p(n[1].text) + ")," + e.compileNode(t, n[2]) + "," + e.compileNode(t, n[4]) + "," + e.compileNode(t, n[3]) + ")"
        }, "@": function (t, n) {
            return ".helper(" + p(n[1].text) + "," + e.compileNode(t, n[2]) + "," + e.compileNode(t, n[4]) + "," + e.compileNode(t, n[3]) + ")"
        }, "%": function (t, n) {
            var r = n[1][1];
            if (!e.pragmas[r]) return "";
            var i = n[4], s = {};
            for (var o = 1, u = i.length; o < u; o++) {
                var a = i[o];
                s[a[1][1]] = a[2]
            }
            var f = n[3], l = {};
            for (var o = 1, u = f.length; o < u; o++) {
                var c = f[o];
                l[c[1][1]] = c[2][1]
            }
            var h = n[2][1] ? n[2][1].text : null;
            return e.pragmas[r](t, h, s, l)
        }, partial: function (t, n) {
            return ".partial(" + e.compileNode(t, n[1]) + "," + e.compileNode(t, n[2]) + "," + e.compileNode(t, n[3]) + ")"
        }, context: function (t, n) {
            return n[1] ? "ctx.rebase(" + e.compileNode(t, n[1]) + ")" : "ctx"
        }, params: function (t, n) {
            var r = [];
            for (var i = 1, s = n.length; i < s; i++) r.push(e.compileNode(t, n[i]));
            return r.length ? "{" + r.join(",") + "}" : "null"
        }, bodies: function (t, n) {
            var r = [];
            for (var i = 1, s = n.length; i < s; i++) r.push(e.compileNode(t, n[i]));
            return "{" + r.join(",") + "}"
        }, param: function (t, n) {
            return e.compileNode(t, n[1]) + ":" + e.compileNode(t, n[2])
        }, filters: function (e, t) {
            var n = [];
            for (var r = 1, i = t.length; r < i; r++) {
                var s = t[r];
                n.push('"' + s + '"')
            }
            return '"' + e.auto + '"' + (n.length ? ",[" + n.join(",") + "]" : "")
        }, key: function (e, t) {
            return 'ctx.get("' + t[1] + '")'
        }, path: function (t, n) {
            var r = n[1], i = n[2], s = [];
            for (var o = 0, u = i.length; o < u; o++) e.isArray(i[o]) ? s.push(e.compileNode(t, i[o])) : s.push('"' + i[o] + '"');
            return "ctx.getPath(" + r + ",[" + s.join(",") + "])"
        }, literal: function (e, t) {
            return p(t[1])
        }
    };
    var p = typeof JSON == "undefined" ? function (t) {
        return '"' + e.escapeJs(t) + '"'
    } : JSON.stringify;
    return e
};
typeof exports != "undefined" ? module.exports = dustCompiler : dustCompiler(getGlobal()), function (e) {
    var t = function () {
        function e(e) {
            return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"'
        }

        var n = {
            parse: function (n, r) {
                function f(e, t, n) {
                    var r = e, i = n - e.length;
                    for (var s = 0; s < i; s++) r = t + r;
                    return r
                }

                function l(e) {
                    var t = e.charCodeAt(0), n, r;
                    return t <= 255 ? (n = "x", r = 2) : (n = "u", r = 4), "\\" + n + f(t.toString(16).toUpperCase(), "0", r)
                }

                function c(e) {
                    var t = {};
                    for (var n in e) t[n] = e[n];
                    return t
                }

                function h(e, t) {
                    var r = e.offset + t;
                    for (var i = e.offset; i < r; i++) {
                        var s = n.charAt(i);
                        s === "\n" ? (e.seenCR || e.line++, e.column = 1, e.seenCR = !1) : s === "\r" || s === "\u2028" || s === "\u2029" ? (e.line++, e.column = 1, e.seenCR = !0) : (e.column++, e.seenCR = !1)
                    }
                    e.offset += t
                }

                function p(e) {
                    if (s.offset < u.offset) return;
                    s.offset > u.offset && (u = c(s), a = []), a.push(e)
                }

                function d() {
                    var e, t, n;
                    n = c(s), e = [], t = v();
                    while (t !== null) e.push(t), t = v();
                    return e !== null && (e = function (e, t, n, r) {
                        return ["body"].concat(r)
                    }(n.offset, n.line, n.column, e)), e === null && (s = c(n)), e
                }

                function v() {
                    var e;
                    return e = I(), e === null && (e = m(), e === null && (e = x(), e === null && (e = N(), e === null && (e = S(), e === null && (e = B()))))), e
                }

                function m() {
                    var e, t, r, i, u, a, f, l, v;
                    o++, l = c(s), v = c(s), e = g();
                    if (e !== null) {
                        t = [], r = V();
                        while (r !== null) t.push(r), r = V();
                        t !== null ? (r = U(), r !== null ? (i = d(), i !== null ? (u = E(), u !== null ? (a = y(), a = a !== null ? a : "", a !== null ? (f = function (e, t, n, r, i, s, o) {
                            if (!o || r[1].text !== o.text) throw new Error("Expected end tag for " + r[1].text + " but it was not found. At line : " + t + ", column : " + n);
                            return !0
                        }(s.offset, s.line, s.column, e, i, u, a) ? "" : null, f !== null ? e = [e, t, r, i, u, a, f] : (e = null, s = c(v))) : (e = null, s = c(v))) : (e = null, s = c(v))) : (e = null, s = c(v))) : (e = null, s = c(v))) : (e = null, s = c(v))
                    } else e = null, s = c(v);
                    e !== null && (e = function (e, t, n, r, i, s, o) {
                        return s.push(["param", ["literal", "block"], i]), r.push(s), r
                    }(l.offset, l.line, l.column, e[0], e[3], e[4], e[5])), e === null && (s = c(l));
                    if (e === null) {
                        l = c(s), v = c(s), e = g();
                        if (e !== null) {
                            t = [], r = V();
                            while (r !== null) t.push(r), r = V();
                            t !== null ? (n.charCodeAt(s.offset) === 47 ? (r = "/", h(s, 1)) : (r = null, o === 0 && p('"/"')), r !== null ? (i = U(), i !== null ? e = [e, t, r, i] : (e = null, s = c(v))) : (e = null, s = c(v))) : (e = null, s = c(v))
                        } else e = null, s = c(v);
                        e !== null && (e = function (e, t, n, r) {
                            return r.push(["bodies"]), r
                        }(l.offset, l.line, l.column, e[0])), e === null && (s = c(l))
                    }
                    return o--, o === 0 && e === null && p("section"), e
                }

                function g() {
                    var e, t, r, i, u, a, f, l;
                    f = c(s), l = c(s), e = R();
                    if (e !== null) {
                        /^[#?^<+@%]/.test(n.charAt(s.offset)) ? (t = n.charAt(s.offset), h(s, 1)) : (t = null, o === 0 && p("[#?^<+@%]"));
                        if (t !== null) {
                            r = [], i = V();
                            while (i !== null) r.push(i), i = V();
                            r !== null ? (i = C(), i !== null ? (u = b(), u !== null ? (a = w(), a !== null ? e = [e, t, r, i, u, a] : (e = null, s = c(l))) : (e = null, s = c(l))) : (e = null, s = c(l))) : (e = null, s = c(l))
                        } else e = null, s = c(l)
                    } else e = null, s = c(l);
                    return e !== null && (e = function (e, t, n, r, i, s, o) {
                        return [r, i, s, o]
                    }(f.offset, f.line, f.column, e[1], e[3], e[4], e[5])), e === null && (s = c(f)), e
                }

                function y() {
                    var e, t, r, i, u, a, f, l;
                    o++, f = c(s), l = c(s), e = R();
                    if (e !== null) {
                        n.charCodeAt(s.offset) === 47 ? (t = "/", h(s, 1)) : (t = null, o === 0 && p('"/"'));
                        if (t !== null) {
                            r = [], i = V();
                            while (i !== null) r.push(i), i = V();
                            if (r !== null) {
                                i = C();
                                if (i !== null) {
                                    u = [], a = V();
                                    while (a !== null) u.push(a), a = V();
                                    u !== null ? (a = U(), a !== null ? e = [e, t, r, i, u, a] : (e = null, s = c(l))) : (e = null, s = c(l))
                                } else e = null, s = c(l)
                            } else e = null, s = c(l)
                        } else e = null, s = c(l)
                    } else e = null, s = c(l);
                    return e !== null && (e = function (e, t, n, r) {
                        return r
                    }(f.offset, f.line, f.column, e[3])), e === null && (s = c(f)), o--, o === 0 && e === null && p("end tag"), e
                }

                function b() {
                    var e, t, r, i, u;
                    return r = c(s), i = c(s), u = c(s), n.charCodeAt(s.offset) === 58 ? (e = ":", h(s, 1)) : (e = null, o === 0 && p('":"')), e !== null ? (t = C(), t !== null ? e = [e, t] : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n, r) {
                        return r
                    }(i.offset, i.line, i.column, e[1])), e === null && (s = c(i)), e = e !== null ? e : "", e !== null && (e = function (e, t, n, r) {
                        return r ? ["context", r] : ["context"]
                    }(r.offset, r.line, r.column, e)), e === null && (s = c(r)), e
                }

                function w() {
                    var e, t, r, i, u, a, f, l;
                    o++, a = c(s), e = [], f = c(s), l = c(s), r = V();
                    if (r !== null) {
                        t = [];
                        while (r !== null) t.push(r), r = V()
                    } else t = null;
                    t !== null ? (r = M(), r !== null ? (n.charCodeAt(s.offset) === 61 ? (i = "=", h(s, 1)) : (i = null, o === 0 && p('"="')), i !== null ? (u = k(), u === null && (u = C(), u === null && (u = P())), u !== null ? t = [t, r, i, u] : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l)), t !== null && (t = function (e, t, n, r, i) {
                        return ["param", ["literal", r], i]
                    }(f.offset, f.line, f.column, t[1], t[3])), t === null && (s = c(f));
                    while (t !== null) {
                        e.push(t), f = c(s), l = c(s), r = V();
                        if (r !== null) {
                            t = [];
                            while (r !== null) t.push(r), r = V()
                        } else t = null;
                        t !== null ? (r = M(), r !== null ? (n.charCodeAt(s.offset) === 61 ? (i = "=", h(s, 1)) : (i = null, o === 0 && p('"="')), i !== null ? (u = k(), u === null && (u = C(), u === null && (u = P())), u !== null ? t = [t, r, i, u] : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l)), t !== null && (t = function (e, t, n, r, i) {
                            return ["param", ["literal", r], i]
                        }(f.offset, f.line, f.column, t[1], t[3])), t === null && (s = c(f))
                    }
                    return e !== null && (e = function (e, t, n, r) {
                        return ["params"].concat(r)
                    }(a.offset, a.line, a.column, e)), e === null && (s = c(a)), o--, o === 0 && e === null && p("params"), e
                }

                function E() {
                    var e, t, r, i, u, a, f, l, v;
                    o++, f = c(s), e = [], l = c(s), v = c(s), t = R(), t !== null ? (n.charCodeAt(s.offset) === 58 ? (r = ":", h(s, 1)) : (r = null, o === 0 && p('":"')), r !== null ? (i = M(), i !== null ? (u = U(), u !== null ? (a = d(), a !== null ? t = [t, r, i, u, a] : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v)), t !== null && (t = function (e, t, n, r, i) {
                        return ["param", ["literal", r], i]
                    }(l.offset, l.line, l.column, t[2], t[4])), t === null && (s = c(l));
                    while (t !== null) e.push(t), l = c(s), v = c(s), t = R(), t !== null ? (n.charCodeAt(s.offset) === 58 ? (r = ":", h(s, 1)) : (r = null, o === 0 && p('":"')), r !== null ? (i = M(), i !== null ? (u = U(), u !== null ? (a = d(), a !== null ? t = [t, r, i, u, a] : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v))) : (t = null, s = c(v)), t !== null && (t = function (e, t, n, r, i) {
                        return ["param", ["literal", r], i]
                    }(l.offset, l.line, l.column, t[2], t[4])), t === null && (s = c(l));
                    return e !== null && (e = function (e, t, n, r) {
                        return ["bodies"].concat(r)
                    }(f.offset, f.line, f.column, e)), e === null && (s = c(f)), o--, o === 0 && e === null && p("bodies"), e
                }

                function S() {
                    var e, t, n, r, i, u;
                    return o++, i = c(s), u = c(s), e = R(), e !== null ? (t = C(), t !== null ? (n = T(), n !== null ? (r = U(), r !== null ? e = [e, t, n, r] : (e = null, s = c(u))) : (e = null, s = c(u))) : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n, r, i) {
                        return ["reference", r, i]
                    }(i.offset, i.line, i.column, e[1], e[2])), e === null && (s = c(i)), o--, o === 0 && e === null && p("reference"), e
                }

                function x() {
                    var e, t, r, i, u, a, f, l, d, v, m, g;
                    o++, v = c(s), m = c(s), e = R();
                    if (e !== null) {
                        n.charCodeAt(s.offset) === 62 ? (t = ">", h(s, 1)) : (t = null, o === 0 && p('">"')), t === null && (n.charCodeAt(s.offset) === 43 ? (t = "+", h(s, 1)) : (t = null, o === 0 && p('"+"')));
                        if (t !== null) {
                            r = [], i = V();
                            while (i !== null) r.push(i), i = V();
                            if (r !== null) {
                                g = c(s), i = M(), i !== null && (i = function (e, t, n, r) {
                                    return ["literal", r]
                                }(g.offset, g.line, g.column, i)), i === null && (s = c(g)), i === null && (i = P());
                                if (i !== null) {
                                    u = b();
                                    if (u !== null) {
                                        a = w();
                                        if (a !== null) {
                                            f = [], l = V();
                                            while (l !== null) f.push(l), l = V();
                                            f !== null ? (n.charCodeAt(s.offset) === 47 ? (l = "/", h(s, 1)) : (l = null, o === 0 && p('"/"')), l !== null ? (d = U(), d !== null ? e = [e, t, r, i, u, a, f, l, d] : (e = null, s = c(m))) : (e = null, s = c(m))) : (e = null, s = c(m))
                                        } else e = null, s = c(m)
                                    } else e = null, s = c(m)
                                } else e = null, s = c(m)
                            } else e = null, s = c(m)
                        } else e = null, s = c(m)
                    } else e = null, s = c(m);
                    return e !== null && (e = function (e, t, n, r, i, s, o) {
                        var u = r === ">" ? "partial" : r;
                        return [u, i, s, o]
                    }(v.offset, v.line, v.column, e[1], e[3], e[4], e[5])), e === null && (s = c(v)), o--, o === 0 && e === null && p("partial"), e
                }

                function T() {
                    var e, t, r, i, u, a;
                    o++, i = c(s), e = [], u = c(s), a = c(s), n.charCodeAt(s.offset) === 124 ? (t = "|", h(s, 1)) : (t = null, o === 0 && p('"|"')), t !== null ? (r = M(), r !== null ? t = [t, r] : (t = null, s = c(a))) : (t = null, s = c(a)), t !== null && (t = function (e, t, n, r) {
                        return r
                    }(u.offset, u.line, u.column, t[1])), t === null && (s = c(u));
                    while (t !== null) e.push(t), u = c(s), a = c(s), n.charCodeAt(s.offset) === 124 ? (t = "|", h(s, 1)) : (t = null, o === 0 && p('"|"')), t !== null ? (r = M(), r !== null ? t = [t, r] : (t = null, s = c(a))) : (t = null, s = c(a)), t !== null && (t = function (e, t, n, r) {
                        return r
                    }(u.offset, u.line, u.column, t[1])), t === null && (s = c(u));
                    return e !== null && (e = function (e, t, n, r) {
                        return ["filters"].concat(r)
                    }(i.offset, i.line, i.column, e)), e === null && (s = c(i)), o--, o === 0 && e === null && p("filters"), e
                }

                function N() {
                    var e, t, r, i, u, a;
                    return o++, u = c(s), a = c(s), e = R(), e !== null ? (n.charCodeAt(s.offset) === 126 ? (t = "~", h(s, 1)) : (t = null, o === 0 && p('"~"')), t !== null ? (r = M(), r !== null ? (i = U(), i !== null ? e = [e, t, r, i] : (e = null, s = c(a))) : (e = null, s = c(a))) : (e = null, s = c(a))) : (e = null, s = c(a)), e !== null && (e = function (e, t, n, r) {
                        return ["special", r]
                    }(u.offset, u.line, u.column, e[2])), e === null && (s = c(u)), o--, o === 0 && e === null && p("special"), e
                }

                function C() {
                    var e, t;
                    return o++, t = c(s), e = O(), e !== null && (e = function (e, t, n, r) {
                        var i = ["path"].concat(r);
                        return i.text = r[1].join("."), i
                    }(t.offset, t.line, t.column, e)), e === null && (s = c(t)), e === null && (t = c(s), e = M(), e !== null && (e = function (e, t, n, r) {
                        var i = ["key", r];
                        return i.text = r, i
                    }(t.offset, t.line, t.column, e)), e === null && (s = c(t))), o--, o === 0 && e === null && p("identifier"), e
                }

                function k() {
                    var e, t;
                    return o++, t = c(s), e = L(), e === null && (e = A()), e !== null && (e = function (e, t, n, r) {
                        return ["literal", r]
                    }(t.offset, t.line, t.column, e)), e === null && (s = c(t)), o--, o === 0 && e === null && p("number"), e
                }

                function L() {
                    var e, t, r, i, u, a;
                    o++, u = c(s), a = c(s), e = A();
                    if (e !== null) {
                        n.charCodeAt(s.offset) === 46 ? (t = ".", h(s, 1)) : (t = null, o === 0 && p('"."'));
                        if (t !== null) {
                            i = A();
                            if (i !== null) {
                                r = [];
                                while (i !== null) r.push(i), i = A()
                            } else r = null;
                            r !== null ? e = [e, t, r] : (e = null, s = c(a))
                        } else e = null, s = c(a)
                    } else e = null, s = c(a);
                    return e !== null && (e = function (e, t, n, r, i) {
                        return parseFloat(r + "." + i.join(""))
                    }(u.offset, u.line, u.column, e[0], e[2])), e === null && (s = c(u)), o--, o === 0 && e === null && p("frac"), e
                }

                function A() {
                    var e, t, r;
                    o++, r = c(s), /^[0-9]/.test(n.charAt(s.offset)) ? (t = n.charAt(s.offset), h(s, 1)) : (t = null, o === 0 && p("[0-9]"));
                    if (t !== null) {
                        e = [];
                        while (t !== null) e.push(t), /^[0-9]/.test(n.charAt(s.offset)) ? (t = n.charAt(s.offset), h(s, 1)) : (t = null, o === 0 && p("[0-9]"))
                    } else e = null;
                    return e !== null && (e = function (e, t, n, r) {
                        return parseInt(r.join(""), 10)
                    }(r.offset, r.line, r.column, e)), e === null && (s = c(r)), o--, o === 0 && e === null && p("integer"), e
                }

                function O() {
                    var e, t, r, i, u;
                    o++, i = c(s), u = c(s), e = M(), e = e !== null ? e : "";
                    if (e !== null) {
                        r = D(), r === null && (r = _());
                        if (r !== null) {
                            t = [];
                            while (r !== null) t.push(r), r = D(), r === null && (r = _())
                        } else t = null;
                        t !== null ? e = [e, t] : (e = null, s = c(u))
                    } else e = null, s = c(u);
                    e !== null && (e = function (e, t, n, r, i) {
                        return i = i[0], r && i ? (i.unshift(r), [!1, i]) : [!0, i]
                    }(i.offset, i.line, i.column, e[0], e[1])), e === null && (s = c(i));
                    if (e === null) {
                        i = c(s), u = c(s), n.charCodeAt(s.offset) === 46 ? (e = ".", h(s, 1)) : (e = null, o === 0 && p('"."'));
                        if (e !== null) {
                            t = [], r = D(), r === null && (r = _());
                            while (r !== null) t.push(r), r = D(), r === null && (r = _());
                            t !== null ? e = [e, t] : (e = null, s = c(u))
                        } else e = null, s = c(u);
                        e !== null && (e = function (e, t, n, r) {
                            return r.length > 0 ? [!0, r[0]] : [!0, []]
                        }(i.offset, i.line, i.column, e[1])), e === null && (s = c(i))
                    }
                    return o--, o === 0 && e === null && p("path"), e
                }

                function M() {
                    var e, t, r, i, u;
                    o++, i = c(s), u = c(s), /^[a-zA-Z_$]/.test(n.charAt(s.offset)) ? (e = n.charAt(s.offset), h(s, 1)) : (e = null, o === 0 && p("[a-zA-Z_$]"));
                    if (e !== null) {
                        t = [], /^[0-9a-zA-Z_$\-]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p("[0-9a-zA-Z_$\\-]"));
                        while (r !== null) t.push(r), /^[0-9a-zA-Z_$\-]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p("[0-9a-zA-Z_$\\-]"));
                        t !== null ? e = [e, t] : (e = null, s = c(u))
                    } else e = null, s = c(u);
                    return e !== null && (e = function (e, t, n, r, i) {
                        return r + i.join("")
                    }(i.offset, i.line, i.column, e[0], e[1])), e === null && (s = c(i)), o--, o === 0 && e === null && p("key"), e
                }

                function _() {
                    var e, t, r, i, u, a, f, l;
                    o++, i = c(s), u = c(s), a = c(s), f = c(s), e = z();
                    if (e !== null) {
                        l = c(s), /^[0-9]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p("[0-9]"));
                        if (r !== null) {
                            t = [];
                            while (r !== null) t.push(r), /^[0-9]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p("[0-9]"))
                        } else t = null;
                        t !== null && (t = function (e, t, n, r) {
                            return r.join("")
                        }(l.offset, l.line, l.column, t)), t === null && (s = c(l)), t === null && (t = C()), t !== null ? (r = W(), r !== null ? e = [e, t, r] : (e = null, s = c(f))) : (e = null, s = c(f))
                    } else e = null, s = c(f);
                    return e !== null && (e = function (e, t, n, r) {
                        return r
                    }(a.offset, a.line, a.column, e[1])), e === null && (s = c(a)), e !== null ? (t = D(), t = t !== null ? t : "", t !== null ? e = [e, t] : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n, r, i) {
                        return i ? i.unshift(r) : i = [r], i
                    }(i.offset, i.line, i.column, e[0], e[1])), e === null && (s = c(i)), o--, o === 0 && e === null && p("array"), e
                }

                function D() {
                    var e, t, r, i, u, a, f;
                    o++, i = c(s), u = c(s), a = c(s), f = c(s), n.charCodeAt(s.offset) === 46 ? (t = ".", h(s, 1)) : (t = null, o === 0 && p('"."')), t !== null ? (r = M(), r !== null ? t = [t, r] : (t = null, s = c(f))) : (t = null, s = c(f)), t !== null && (t = function (e, t, n, r) {
                        return r
                    }(a.offset, a.line, a.column, t[1])), t === null && (s = c(a));
                    if (t !== null) {
                        e = [];
                        while (t !== null) e.push(t), a = c(s), f = c(s), n.charCodeAt(s.offset) === 46 ? (t = ".", h(s, 1)) : (t = null, o === 0 && p('"."')), t !== null ? (r = M(), r !== null ? t = [t, r] : (t = null, s = c(f))) : (t = null, s = c(f)), t !== null && (t = function (e, t, n, r) {
                            return r
                        }(a.offset, a.line, a.column, t[1])), t === null && (s = c(a))
                    } else e = null;
                    return e !== null ? (t = _(), t = t !== null ? t : "", t !== null ? e = [e, t] : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n, r, i) {
                        return i ? r.concat(i) : r
                    }(i.offset, i.line, i.column, e[0], e[1])), e === null && (s = c(i)), o--, o === 0 && e === null && p("array_part"), e
                }

                function P() {
                    var e, t, r, i, u;
                    o++, i = c(s), u = c(s), n.charCodeAt(s.offset) === 34 ? (e = '"', h(s, 1)) : (e = null, o === 0 && p('"\\""')), e !== null ? (n.charCodeAt(s.offset) === 34 ? (t = '"', h(s, 1)) : (t = null, o === 0 && p('"\\""')), t !== null ? e = [e, t] : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n) {
                        return ["literal", ""]
                    }(i.offset, i.line, i.column)), e === null && (s = c(i));
                    if (e === null) {
                        i = c(s), u = c(s), n.charCodeAt(s.offset) === 34 ? (e = '"', h(s, 1)) : (e = null, o === 0 && p('"\\""')), e !== null ? (t = j(), t !== null ? (n.charCodeAt(s.offset) === 34 ? (r = '"', h(s, 1)) : (r = null, o === 0 && p('"\\""')), r !== null ? e = [e, t, r] : (e = null, s = c(u))) : (e = null, s = c(u))) : (e = null, s = c(u)), e !== null && (e = function (e, t, n, r) {
                            return ["literal", r]
                        }(i.offset, i.line, i.column, e[1])), e === null && (s = c(i));
                        if (e === null) {
                            i = c(s), u = c(s), n.charCodeAt(s.offset) === 34 ? (e = '"', h(s, 1)) : (e = null, o === 0 && p('"\\""'));
                            if (e !== null) {
                                r = H();
                                if (r !== null) {
                                    t = [];
                                    while (r !== null) t.push(r), r = H()
                                } else t = null;
                                t !== null ? (n.charCodeAt(s.offset) === 34 ? (r = '"', h(s, 1)) : (r = null, o === 0 && p('"\\""')), r !== null ? e = [e, t, r] : (e = null, s = c(u))) : (e = null, s = c(u))
                            } else e = null, s = c(u);
                            e !== null && (e = function (e, t, n, r) {
                                return ["body"].concat(r)
                            }(i.offset, i.line, i.column, e[1])), e === null && (s = c(i))
                        }
                    }
                    return o--, o === 0 && e === null && p("inline"), e
                }

                function H() {
                    var e, t;
                    return e = N(), e === null && (e = S(), e === null && (t = c(s), e = j(), e !== null && (e = function (e, t, n, r) {
                        return ["buffer", r]
                    }(t.offset, t.line, t.column, e)), e === null && (s = c(t)))), e
                }

                function B() {
                    var e, t, r, i, u, a, f, l, d;
                    o++, a = c(s), f = c(s), e = X();
                    if (e !== null) {
                        t = [], r = V();
                        while (r !== null) t.push(r), r = V();
                        t !== null ? e = [e, t] : (e = null, s = c(f))
                    } else e = null, s = c(f);
                    e !== null && (e = function (e, t, n, r, i) {
                        return ["format", r, i.join("")]
                    }(a.offset, a.line, a.column, e[0], e[1])), e === null && (s = c(a));
                    if (e === null) {
                        a = c(s), f = c(s), l = c(s), d = c(s), o++, t = q(), o--, t === null ? t = "" : (t = null, s = c(d)), t !== null ? (d = c(s), o++, r = I(), o--, r === null ? r = "" : (r = null, s = c(d)), r !== null ? (d = c(s), o++, i = X(), o--, i === null ? i = "" : (i = null, s = c(d)), i !== null ? (n.length > s.offset ? (u = n.charAt(s.offset), h(s, 1)) : (u = null, o === 0 && p("any character")), u !== null ? t = [t, r, i, u] : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l)), t !== null && (t = function (e, t, n, r) {
                            return r
                        }(f.offset, f.line, f.column, t[3])), t === null && (s = c(f));
                        if (t !== null) {
                            e = [];
                            while (t !== null) e.push(t), f = c(s), l = c(s), d = c(s), o++, t = q(), o--, t === null ? t = "" : (t = null, s = c(d)), t !== null ? (d = c(s), o++, r = I(), o--, r === null ? r = "" : (r = null, s = c(d)), r !== null ? (d = c(s), o++, i = X(), o--, i === null ? i = "" : (i = null, s = c(d)), i !== null ? (n.length > s.offset ? (u = n.charAt(s.offset), h(s, 1)) : (u = null, o === 0 && p("any character")), u !== null ? t = [t, r, i, u] : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l))) : (t = null, s = c(l)), t !== null && (t = function (e, t, n, r) {
                                return r
                            }(f.offset, f.line, f.column, t[3])), t === null && (s = c(f))
                        } else e = null;
                        e !== null && (e = function (e, t, n, r) {
                            return ["buffer", r.join("")]
                        }(a.offset, a.line, a.column, e)), e === null && (s = c(a))
                    }
                    return o--, o === 0 && e === null && p("buffer"), e
                }

                function j() {
                    var e, t, r, i, u, a, f;
                    o++, i = c(s), u = c(s), a = c(s), f = c(s), o++, t = q(), o--, t === null ? t = "" : (t = null, s = c(f)), t !== null ? (r = F(), r === null && (/^[^"]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p('[^"]'))), r !== null ? t = [t, r] : (t = null, s = c(a))) : (t = null, s = c(a)), t !== null && (t = function (e, t, n, r) {
                        return r
                    }(u.offset, u.line, u.column, t[1])), t === null && (s = c(u));
                    if (t !== null) {
                        e = [];
                        while (t !== null) e.push(t), u = c(s), a = c(s), f = c(s), o++, t = q(), o--, t === null ? t = "" : (t = null, s = c(f)), t !== null ? (r = F(), r === null && (/^[^"]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p('[^"]'))), r !== null ? t = [t, r] : (t = null, s = c(a))) : (t = null, s = c(a)), t !== null && (t = function (e, t, n, r) {
                            return r
                        }(u.offset, u.line, u.column, t[1])), t === null && (s = c(u))
                    } else e = null;
                    return e !== null && (e = function (e, t, n, r) {
                        return r.join("")
                    }(i.offset, i.line, i.column, e)), e === null && (s = c(i)), o--, o === 0 && e === null && p("literal"), e
                }

                function F() {
                    var e, t;
                    return t = c(s), n.substr(s.offset, 2) === '\\"' ? (e = '\\"', h(s, 2)) : (e = null, o === 0 && p('"\\\\\\""')), e !== null && (e = function (e, t, n) {
                        return '"'
                    }(t.offset, t.line, t.column)), e === null && (s = c(t)), e
                }

                function I() {
                    var e, t, r, i, u, a, f, l, d;
                    o++, u = c(s), a = c(s), n.substr(s.offset, 2) === "{!" ? (e = "{!", h(s, 2)) : (e = null, o === 0 && p('"{!"'));
                    if (e !== null) {
                        t = [], f = c(s), l = c(s), d = c(s), o++, n.substr(s.offset, 2) === "!}" ? (r = "!}", h(s, 2)) : (r = null, o === 0 && p('"!}"')), o--, r === null ? r = "" : (r = null, s = c(d)), r !== null ? (n.length > s.offset ? (i = n.charAt(s.offset), h(s, 1)) : (i = null, o === 0 && p("any character")), i !== null ? r = [r, i] : (r = null, s = c(l))) : (r = null, s = c(l)), r !== null && (r = function (e, t, n, r) {
                            return r
                        }(f.offset, f.line, f.column, r[1])), r === null && (s = c(f));
                        while (r !== null) t.push(r), f = c(s), l = c(s), d = c(s), o++, n.substr(s.offset, 2) === "!}" ? (r = "!}", h(s, 2)) : (r = null, o === 0 && p('"!}"')), o--, r === null ? r = "" : (r = null, s = c(d)), r !== null ? (n.length > s.offset ? (i = n.charAt(s.offset), h(s, 1)) : (i = null, o === 0 && p("any character")), i !== null ? r = [r, i] : (r = null, s = c(l))) : (r = null, s = c(l)), r !== null && (r = function (e, t, n, r) {
                            return r
                        }(f.offset, f.line, f.column, r[1])), r === null && (s = c(f));
                        t !== null ? (n.substr(s.offset, 2) === "!}" ? (r = "!}", h(s, 2)) : (r = null, o === 0 && p('"!}"')), r !== null ? e = [e, t, r] : (e = null, s = c(a))) : (e = null, s = c(a))
                    } else e = null, s = c(a);
                    return e !== null && (e = function (e, t, n, r) {
                        return ["comment", r.join("")]
                    }(u.offset, u.line, u.column, e[1])), e === null && (s = c(u)), o--, o === 0 && e === null && p("comment"), e
                }

                function q() {
                    var e, t, r, i, u, a, f, l, d, v, m;
                    d = c(s), e = R();
                    if (e !== null) {
                        t = [], r = V();
                        while (r !== null) t.push(r), r = V();
                        if (t !== null) {
                            /^[#?^><+%:@\/~%]/.test(n.charAt(s.offset)) ? (r = n.charAt(s.offset), h(s, 1)) : (r = null, o === 0 && p("[#?^><+%:@\\/~%]"));
                            if (r !== null) {
                                i = [], u = V();
                                while (u !== null) i.push(u), u = V();
                                if (i !== null) {
                                    v = c(s), m = c(s), o++, a = U(), o--, a === null ? a = "" : (a = null, s = c(m)), a !== null ? (m = c(s), o++, f = X(), o--, f === null ? f = "" : (f = null, s = c(m)), f !== null ? (n.length > s.offset ? (l = n.charAt(s.offset), h(s, 1)) : (l = null, o === 0 && p("any character")), l !== null ? a = [a, f, l] : (a = null, s = c(v))) : (a = null, s = c(v))) : (a = null, s = c(v));
                                    if (a !== null) {
                                        u = [];
                                        while (a !== null) u.push(a), v = c(s), m = c(s), o++, a = U(), o--, a === null ? a = "" : (a = null, s = c(m)), a !== null ? (m = c(s), o++, f = X(), o--, f === null ? f = "" : (f = null, s = c(m)), f !== null ? (n.length > s.offset ? (l = n.charAt(s.offset), h(s, 1)) : (l = null, o === 0 && p("any character")), l !== null ? a = [a, f, l] : (a = null, s = c(v))) : (a = null, s = c(v))) : (a = null, s = c(v))
                                    } else u = null;
                                    if (u !== null) {
                                        a = [], f = V();
                                        while (f !== null) a.push(f), f = V();
                                        a !== null ? (f = U(), f !== null ? e = [e, t, r, i, u, a, f] : (e = null, s = c(d))) : (e = null, s = c(d))
                                    } else e = null, s = c(d)
                                } else e = null, s = c(d)
                            } else e = null, s = c(d)
                        } else e = null, s = c(d)
                    } else e = null, s = c(d);
                    return e === null && (e = S()), e
                }

                function R() {
                    var e;
                    return n.charCodeAt(s.offset) === 123 ? (e = "{", h(s, 1)) : (e = null, o === 0 && p('"{"')), e
                }

                function U() {
                    var e;
                    return n.charCodeAt(s.offset) === 125 ? (e = "}", h(s, 1)) : (e = null, o === 0 && p('"}"')), e
                }

                function z() {
                    var e;
                    return n.charCodeAt(s.offset) === 91 ? (e = "[", h(s, 1)) : (e = null, o === 0 && p('"["')), e
                }

                function W() {
                    var e;
                    return n.charCodeAt(s.offset) === 93 ? (e = "]", h(s, 1)) : (e = null, o === 0 && p('"]"')), e
                }

                function X() {
                    var e;
                    return n.charCodeAt(s.offset) === 10 ? (e = "\n", h(s, 1)) : (e = null, o === 0 && p('"\\n"')), e === null && (n.substr(s.offset, 2) === "\r\n" ? (e = "\r\n", h(s, 2)) : (e = null, o === 0 && p('"\\r\\n"')), e === null && (n.charCodeAt(s.offset) === 13 ? (e = "\r", h(s, 1)) : (e = null, o === 0 && p('"\\r"')), e === null && (n.charCodeAt(s.offset) === 8232 ? (e = "\u2028", h(s, 1)) : (e = null, o === 0 && p('"\\u2028"')), e === null && (n.charCodeAt(s.offset) === 8233 ? (e = "\u2029", h(s, 1)) : (e = null, o === 0 && p('"\\u2029"')))))), e
                }

                function V() {
                    var e;
                    return /^[\t\x0B\f \xA0\uFEFF]/.test(n.charAt(s.offset)) ? (e = n.charAt(s.offset), h(s, 1)) : (e = null, o === 0 && p("[\\t\\x0B\\f \\xA0\\uFEFF]")), e === null && (e = X()), e
                }

                function $(e) {
                    e.sort();
                    var t = null, n = [];
                    for (var r = 0; r < e.length; r++) e[r] !== t && (n.push(e[r]), t = e[r]);
                    return n
                }

                var i = {
                    body: d,
                    part: v,
                    section: m,
                    sec_tag_start: g,
                    end_tag: y,
                    context: b,
                    params: w,
                    bodies: E,
                    reference: S,
                    partial: x,
                    filters: T,
                    special: N,
                    identifier: C,
                    number: k,
                    frac: L,
                    integer: A,
                    path: O,
                    key: M,
                    array: _,
                    array_part: D,
                    inline: P,
                    inline_part: H,
                    buffer: B,
                    literal: j,
                    esc: F,
                    comment: I,
                    tag: q,
                    ld: R,
                    rd: U,
                    lb: z,
                    rb: W,
                    eol: X,
                    ws: V
                };
                if (r !== undefined) {
                    if (i[r] === undefined) throw new Error("Invalid rule name: " + e(r) + ".")
                } else r = "body";
                var s = {offset: 0, line: 1, column: 1, seenCR: !1}, o = 0,
                    u = {offset: 0, line: 1, column: 1, seenCR: !1}, a = [], J = i[r]();
                if (J === null || s.offset !== n.length) {
                    var K = Math.max(s.offset, u.offset), Q = K < n.length ? n.charAt(K) : null,
                        G = s.offset > u.offset ? s : u;
                    throw new t.SyntaxError($(a), Q, K, G.line, G.column)
                }
                return J
            }, toSource: function () {
                return this._source
            }
        };
        return n.SyntaxError = function (t, n, r, i, s) {
            function o(t, n) {
                var r, i;
                switch (t.length) {
                    case 0:
                        r = "end of input";
                        break;
                    case 1:
                        r = t[0];
                        break;
                    default:
                        r = t.slice(0, t.length - 1).join(", ") + " or " + t[t.length - 1]
                }
                return i = n ? e(n) : "end of input", "Expected " + r + " but " + i + " found."
            }

            this.name = "SyntaxError", this.expected = t, this.found = n, this.message = o(t, n), this.offset = r, this.line = i, this.column = s
        }, n.SyntaxError.prototype = Error.prototype, n
    }();
    e.parse = t.parse
}(typeof exports != "undefined" ? exports : getGlobal())