import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const {
  useState,
  useMemo,
  useRef
} = React;

/* ================= 愛しとーと パートナー販売 プロトタイプ v3(社内デモ版) =================
   ※これはデモです。表示されている商品・金額・パートナーコードはすべて架空のサンプルデータで、
     決済・振込は実行されません。
=========================================================================== */

const C = {
  bg: "#FBF5F3",
  card: "#FFFFFF",
  ink: "#3A2A2E",
  sub: "#8A7378",
  beni: "#B23A5B",
  beniDeep: "#8E2244",
  beniPale: "#F6E3E8",
  green: "#2F7A6D",
  greenPale: "#E2EFEC",
  gold: "#C9962E",
  goldPale: "#F7EEDB",
  line: "#EEDFE2",
  gray: "#B9AAAE"
};
const serif = "'Shippori Mincho','Hiragino Mincho ProN','Yu Mincho',serif";
const sans = "'Hiragino Kaku Gothic ProN','Hiragino Sans','Yu Gothic',Meiryo,sans-serif";
const yen = n => "¥" + Math.round(n || 0).toLocaleString("ja-JP");
const INITIAL_PRODUCTS = [{
  id: 1,
  name: "うるおい宣言 コラーゲンゼリー",
  cat: "美容",
  price: 4980,
  sub: true,
  img: null,
  tone: "#E8B4C2"
}, {
  id: 2,
  name: "きらりん酵素",
  cat: "健康",
  price: 3980,
  sub: true,
  img: null,
  tone: "#B7D4C5"
}, {
  id: 3,
  name: "博多発酵 甘酒スムージー",
  cat: "健康",
  price: 2680,
  sub: true,
  img: null,
  tone: "#EFE0C3"
}, {
  id: 4,
  name: "つばき油ヘアオイル",
  cat: "美容",
  price: 2200,
  sub: false,
  img: null,
  tone: "#D9C2A8"
}, {
  id: 5,
  name: "国産すっぽんサプリ",
  cat: "健康",
  price: 5480,
  sub: true,
  img: null,
  tone: "#C3CBB4"
}, {
  id: 6,
  name: "ハンドクリーム 金木犀",
  cat: "美容",
  price: 1650,
  sub: false,
  img: null,
  tone: "#F0CFA8"
}, {
  id: 7,
  name: "薬膳スープセット",
  cat: "食品",
  price: 3240,
  sub: false,
  img: null,
  tone: "#D8B8A6"
}, {
  id: 8,
  name: "プラセンタ美容液",
  cat: "美容",
  price: 6980,
  sub: true,
  img: null,
  tone: "#E5C6D8"
}, {
  id: 9,
  name: "青汁 大麦若葉100%",
  cat: "健康",
  price: 2980,
  sub: true,
  img: null,
  tone: "#BFD8B0"
}, {
  id: 10,
  name: "米ぬか酵素洗顔",
  cat: "美容",
  price: 1980,
  sub: true,
  img: null,
  tone: "#EBD9C0"
}, {
  id: 11,
  name: "黒にんにく卵黄",
  cat: "健康",
  price: 3480,
  sub: true,
  img: null,
  tone: "#C9B8A8"
}, {
  id: 12,
  name: "博多明太だし醤油",
  cat: "食品",
  price: 1280,
  sub: false,
  img: null,
  tone: "#E3B8A0"
}, {
  id: 13,
  name: "リップ美容液 さくら",
  cat: "美容",
  price: 1430,
  sub: false,
  img: null,
  tone: "#F2C9D4"
}, {
  id: 14,
  name: "乳酸菌チュアブル",
  cat: "健康",
  price: 2480,
  sub: true,
  img: null,
  tone: "#D4E0E8"
}, {
  id: 15,
  name: "九州野菜スープカレー",
  cat: "食品",
  price: 2860,
  sub: false,
  img: null,
  tone: "#E0C09A"
}];
const CATS = ["すべて", "美容", "健康", "食品"];
const PARTNERS = [{
  code: "P0102",
  joined: "2025-04"
}, {
  code: "P0131",
  joined: "2025-06"
}, {
  code: "P0207",
  joined: "2025-09"
}, {
  code: "P0244",
  joined: "2025-11"
}, {
  code: "P0311",
  joined: "2026-01"
}, {
  code: "P0358",
  joined: "2026-03"
}];
const INITIAL_RULES = [{
  id: "partner_comm",
  label: "パートナー報酬",
  rate: 0.2,
  dest: "各パートナーのConnectアカウント",
  active: true,
  locked: true
}, {
  id: "system_fee",
  label: "システム利用料",
  rate: 0.03,
  dest: "開発者Connectアカウント(契約後に設定)",
  active: false,
  locked: false
}];
let seq = 100;
const seedData = () => {
  const orders = [];
  const mk = (pid, code, month, isSub, subMonth, customer) => {
    const p = INITIAL_PRODUCTS.find(x => x.id === pid);
    orders.push({
      id: ++seq,
      productId: pid,
      product: p.name,
      price: p.price,
      partner: code,
      month,
      type: isSub ? "定期" : "単品",
      subMonth: subMonth || null,
      customer: customer || null,
      commStatus: month === "2026-07" ? "未確定" : month === "2026-06" ? "確定" : "支払済"
    });
  };
  mk(1, "P0102", "2026-05", true, 1);
  mk(2, "P0131", "2026-05", false);
  mk(5, "P0102", "2026-05", true, 1);
  mk(4, "P0207", "2026-05", false);
  mk(1, "P0102", "2026-06", true, 2);
  mk(5, "P0102", "2026-06", true, 2);
  mk(8, "P0244", "2026-06", true, 1);
  mk(3, "P0131", "2026-06", true, 1);
  mk(6, "P0311", "2026-06", false);
  mk(7, "P0102", "2026-06", false);
  mk(5, "P0102", "2026-07", true, 3);
  mk(8, "P0244", "2026-07", true, 2);
  mk(3, "P0131", "2026-07", true, 2);
  mk(2, "P0358", "2026-07", false);
  mk(1, "P0102", "2026-06", true, 1, "you");
  mk(1, "P0102", "2026-07", true, 2, "you");
  mk(4, "P0102", "2026-06", false, null, "you");
  const subs = [{
    id: 1,
    productId: 1,
    since: "2026-06",
    active: true,
    refBy: "P0102"
  }];
  return {
    orders,
    subs
  };
};
const Chip = ({
  children,
  tone = "beni"
}) => {
  const m = {
    beni: [C.beniPale, C.beniDeep],
    green: [C.greenPale, C.green],
    gold: [C.goldPale, "#8F6A16"],
    gray: ["#F0EBEC", C.sub]
  }[tone];
  return /*#__PURE__*/_jsxDEV("span", {
    style: {
      background: m[0],
      color: m[1],
      borderRadius: 999,
      padding: "3px 10px",
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap"
    },
    children: children
  }, void 0, false);
};
const Card = ({
  children,
  style
}) => /*#__PURE__*/_jsxDEV("div", {
  style: {
    background: C.card,
    border: `1px solid ${C.line}`,
    borderRadius: 14,
    padding: 18,
    ...style
  },
  children: children
}, void 0, false);
const SectionTitle = ({
  children
}) => /*#__PURE__*/_jsxDEV("div", {
  style: {
    fontFamily: serif,
    fontSize: 17,
    fontWeight: 700,
    color: C.ink,
    margin: "4px 0 12px",
    letterSpacing: "0.04em"
  },
  children: children
}, void 0, false);
const ProductImage = ({
  p,
  size = "100%",
  height = 130,
  radius = 10
}) => p.img ? /*#__PURE__*/_jsxDEV("img", {
  src: p.img,
  alt: p.name,
  style: {
    width: size,
    height,
    objectFit: "cover",
    borderRadius: radius,
    display: "block"
  }
}, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
  style: {
    width: size,
    height,
    borderRadius: radius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${p.tone}, #FFFFFF)`,
    color: "rgba(58,42,46,0.55)",
    fontFamily: serif,
    fontSize: height > 60 ? 34 : 18
  },
  children: p.name.slice(0, 1)
}, void 0, false);
function App() {
  const seeded = useMemo(seedData, []);
  const [role, setRole] = useState("shop");
  const [shopTab, setShopTab] = useState("list");
  const [auth, setAuth] = useState({
    partner: false,
    admin: false
  });
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(seeded.orders);
  const [subs, setSubs] = useState(seeded.subs);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [refCode, setRefCode] = useState(null);
  const [me, setMe] = useState("P0102");
  const [toast, setToast] = useState(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("すべて");
  const [sort, setSort] = useState("std");
  const fileRefs = useRef({});
  const commRate = rules.find(r => r.id === "partner_comm").rate;
  const say = t => {
    setToast(t);
    setTimeout(() => setToast(null), 2800);
  };
  const buy = (p, asSub) => {
    setOrders(o => [...o, {
      id: ++seq,
      productId: p.id,
      product: p.name,
      price: p.price,
      partner: refCode,
      month: "2026-07",
      type: asSub ? "定期" : "単品",
      subMonth: asSub ? 1 : null,
      customer: "you",
      commStatus: refCode ? "未確定" : null
    }]);
    if (asSub) setSubs(s => [...s, {
      id: s.length + 100,
      productId: p.id,
      since: "2026-07",
      active: true,
      refBy: refCode
    }]);
    say(refCode ? `購入完了(デモ)。紹介パートナー ${refCode} に ${yen(p.price * commRate)} を計上しました(未確定)` : "購入完了(デモ)。紹介リンク経由ではないため報酬計上はありません");
  };
  const cancelSub = subId => {
    setSubs(s => s.map(x => x.id === subId ? {
      ...x,
      active: false
    } : x));
    say("定期購入を解約しました。今月分までお届けし、来月からの課金は停止します(紹介報酬の計上も停止)");
  };
  const chargeSubs = () => {
    const canceledPids = subs.filter(s => !s.active).map(s => s.productId);
    const target = orders.filter(o => o.type === "定期" && o.month === "2026-07" && !(o.customer === "you" && canceledPids.includes(o.productId)));
    if (!target.length) return say("課金対象の定期購入がありません");
    setOrders(o => [...o, ...target.map(s => ({
      ...s,
      id: ++seq,
      month: "2026-08",
      subMonth: (s.subMonth || 1) + 1,
      commStatus: s.partner ? "未確定" : null
    }))]);
    const skipped = orders.filter(o => o.type === "定期" && o.month === "2026-07" && o.customer === "you" && canceledPids.includes(o.productId)).length;
    say(`定期${target.length}件の翌月課金に成功${skipped ? `(解約済み${skipped}件はスキップ)` : ""}。紹介パートナーへ報酬を自動計上しました`);
  };
  const closeMonth = () => {
    setOrders(o => o.map(x => x.commStatus === "未確定" ? {
      ...x,
      commStatus: "確定"
    } : x));
    say("月次締め処理を実行。未確定の報酬をすべて確定にしました");
  };
  const payout = () => {
    let total = 0;
    setOrders(o => o.map(x => {
      if (x.commStatus === "確定") {
        total += x.price * commRate;
        return {
          ...x,
          commStatus: "支払済"
        };
      }
      return x;
    }));
    say(total > 0 ? `Stripe Connect一括送金を実行(想定): 合計 ${yen(total)} を各パートナー口座へ` : "確定済みの報酬がありません");
  };
  const uploadImage = (pid, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProducts(ps => ps.map(p => p.id === pid ? {
        ...p,
        img: reader.result
      } : p));
      say("商品画像を登録しました。お客様画面に反映されています(本番はクラウドストレージに保存)");
    };
    reader.readAsDataURL(file);
  };
  const ranking = useMemo(() => {
    const m = {};
    orders.forEach(o => {
      if (o.partner) m[o.partner] = (m[o.partner] || 0) + o.price;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [orders]);
  const myOrders = orders.filter(o => o.partner === me);
  const mySum = st => myOrders.filter(o => o.commStatus === st).reduce((s, o) => s + o.price * commRate, 0);
  const totalSales = orders.reduce((s, o) => s + o.price, 0);
  const monthSales = orders.filter(o => o.month === "2026-07").reduce((s, o) => s + o.price, 0);
  const yourOrders = orders.filter(o => o.customer === "you");
  const yourSubs = subs.map(s => ({
    ...s,
    product: products.find(p => p.id === s.productId)
  }));
  const filtered = useMemo(() => {
    let list = products.filter(p => (cat === "すべて" || p.cat === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase())));
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "subFirst") list = [...list].sort((a, b) => (b.sub ? 1 : 0) - (a.sub ? 1 : 0));
    return list;
  }, [products, cat, q, sort]);
  const statusChip = st => st === "未確定" ? /*#__PURE__*/_jsxDEV(Chip, {
    tone: "gray",
    children: "未確定"
  }, void 0, false) : st === "確定" ? /*#__PURE__*/_jsxDEV(Chip, {
    tone: "gold",
    children: "確定"
  }, void 0, false) : st === "支払済" ? /*#__PURE__*/_jsxDEV(Chip, {
    tone: "green",
    children: "支払済"
  }, void 0, false) : /*#__PURE__*/_jsxDEV("span", {
    style: {
      color: C.gray,
      fontSize: 12
    },
    children: "—"
  }, void 0, false);
  const fakeUrl = role === "shop" ? `https://shop.aishitoto.jp/${shopTab === "mypage" ? "mypage" : refCode ? `?ref=${refCode}` : ""}` : role === "partner" ? "https://partner.aishitoto.jp/" : "https://admin.aishitoto.jp/";
  const LoginGate = ({
    kind
  }) => /*#__PURE__*/_jsxDEV(Card, {
    style: {
      maxWidth: 460,
      margin: "40px auto",
      textAlign: "center"
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: serif,
        fontSize: 20,
        color: C.beniDeep,
        marginBottom: 8
      },
      children: kind === "partner" ? "パートナーログイン" : "管理者ログイン"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontSize: 13,
        color: C.sub,
        lineHeight: 1.8,
        marginBottom: 16,
        textAlign: "left"
      },
      children: ["このページは", kind === "partner" ? "パートナー登録者" : "管理者", "専用の別URLです。 お客様がこのURLを開いても、アカウントがなければ中身は一切見えません。 本番ではメールアドレス+パスワード(+管理者は2段階認証)でログインします。"]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 14,
        textAlign: "left"
      },
      children: [/*#__PURE__*/_jsxDEV("input", {
        placeholder: "メールアドレス",
        disabled: true,
        style: {
          border: `1px solid ${C.line}`,
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 13,
          background: "#FAFAFA",
          width: "100%"
        }
      }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
        placeholder: "パスワード",
        type: "password",
        disabled: true,
        style: {
          border: `1px solid ${C.line}`,
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 13,
          background: "#FAFAFA",
          width: "100%"
        }
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
      onClick: () => {
        setAuth(a => ({
          ...a,
          [kind]: true
        }));
        say(kind === "partner" ? "パートナーとしてログインしました(デモ)" : "管理者としてログインしました(デモ)");
      },
      style: {
        background: C.beni,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "11px 22px",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        width: "100%"
      },
      children: kind === "partner" ? "パートナーとしてログイン(デモ)" : "管理者としてログイン(デモ)"
    }, void 0, false), kind === "partner" && /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontSize: 12,
        color: C.sub,
        marginTop: 12
      },
      children: "パートナー登録がまだの方向けに「パートナー募集・申込」ページへの入口も設置できます。"
    }, void 0, false)]
  }, void 0, true);
  return /*#__PURE__*/_jsxDEV("div", {
    style: {
      minHeight: "100vh",
      background: C.bg,
      fontFamily: sans,
      color: C.ink
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        background: C.goldPale,
        fontSize: 12,
        color: "#8F6A16",
        textAlign: "center",
        padding: "6px 12px"
      },
      children: "社内確認用のデモです。商品・金額・コードはすべて架空のサンプルで、決済や振込は行われません。"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        background: C.card,
        borderBottom: `1px solid ${C.line}`
      },
      children: /*#__PURE__*/_jsxDEV("div", {
        style: {
          maxWidth: 980,
          margin: "0 auto",
          padding: "12px 18px 0"
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap"
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: serif,
              fontSize: 20,
              fontWeight: 700,
              color: C.beniDeep,
              letterSpacing: "0.06em"
            },
            children: ["愛しとーと ", /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontSize: 12,
                color: C.sub,
                fontWeight: 400,
                letterSpacing: 0
              },
              children: "パートナー販売システム(プロトタイプ)"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              marginLeft: "auto",
              display: "flex",
              gap: 6,
              alignItems: "center"
            },
            children: [[["shop", "お客様"], ["partner", "パートナー"], ["admin", "管理"]].map(([k, label]) => /*#__PURE__*/_jsxDEV("button", {
              onClick: () => setRole(k),
              style: {
                border: "none",
                cursor: "pointer",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 700,
                background: role === k ? C.beni : "transparent",
                color: role === k ? "#fff" : C.sub
              },
              children: [label, k !== "shop" && !auth[k] ? " 🔒" : ""]
            }, k, true)), (auth.partner || auth.admin) && /*#__PURE__*/_jsxDEV("button", {
              onClick: () => {
                setAuth({
                  partner: false,
                  admin: false
                });
                setRole("shop");
                say("ログアウトしました");
              },
              style: {
                border: `1px solid ${C.line}`,
                background: "#fff",
                color: C.sub,
                borderRadius: 999,
                padding: "7px 12px",
                fontSize: 12,
                cursor: "pointer"
              },
              children: "ログアウト"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            margin: "10px 0 12px",
            background: "#F4EDEE",
            border: `1px solid ${C.line}`,
            borderRadius: 999,
            padding: "7px 16px",
            fontSize: 12,
            color: C.sub,
            display: "flex",
            alignItems: "center",
            gap: 8
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              fontSize: 11
            },
            children: "🔒"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            style: {
              fontFamily: "monospace"
            },
            children: fakeUrl
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            style: {
              marginLeft: "auto",
              fontSize: 11,
              color: C.gray
            },
            children: "本番はこのようにURL(サブドメイン)ごと分離"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: 980,
        margin: "0 auto",
        padding: "20px 18px 60px"
      },
      children: [role === "shop" && /*#__PURE__*/_jsxDEV(React.Fragment, {
        children: [/*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "flex",
            gap: 8,
            marginBottom: 16
          },
          children: [["list", "商品一覧"], ["mypage", "マイページ"]].map(([k, label]) => /*#__PURE__*/_jsxDEV("button", {
            onClick: () => setShopTab(k),
            style: {
              border: `1.5px solid ${shopTab === k ? C.beni : C.line}`,
              cursor: "pointer",
              borderRadius: 10,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              background: shopTab === k ? C.beniPale : "#fff",
              color: shopTab === k ? C.beniDeep : C.sub
            },
            children: label
          }, k, false))
        }, void 0, false), shopTab === "list" && /*#__PURE__*/_jsxDEV(React.Fragment, {
          children: [/*#__PURE__*/_jsxDEV(Card, {
            style: {
              marginBottom: 16,
              background: refCode ? C.greenPale : C.goldPale,
              border: "none"
            },
            children: /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap"
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontSize: 13,
                  flex: 1,
                  minWidth: 220
                },
                children: refCode ? /*#__PURE__*/_jsxDEV("span", {
                  children: ["ご紹介経由でのお買い物です(紹介コード ", /*#__PURE__*/_jsxDEV("b", {
                    children: refCode
                  }, void 0, false), " を自動適用中)。コードのご入力は不要です。"]
                }, void 0, true) : /*#__PURE__*/_jsxDEV("span", {
                  children: "紹介リンクからアクセスすると、紹介者が自動で記録されます。下のボタンでリンクを開いた状態を再現できます。"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  gap: 8
                },
                children: [!refCode && PARTNERS.slice(0, 2).map(p => /*#__PURE__*/_jsxDEV("button", {
                  onClick: () => {
                    setRefCode(p.code);
                    say(`紹介リンク ?ref=${p.code} を開きました(30日間有効で記録)`);
                  },
                  style: {
                    border: `1px solid ${C.beni}`,
                    color: C.beniDeep,
                    background: "#fff",
                    borderRadius: 8,
                    padding: "7px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  },
                  children: ["?ref=", p.code, " を開く"]
                }, p.code, true)), refCode && /*#__PURE__*/_jsxDEV("button", {
                  onClick: () => setRefCode(null),
                  style: {
                    border: `1px solid ${C.gray}`,
                    color: C.sub,
                    background: "#fff",
                    borderRadius: 8,
                    padding: "7px 12px",
                    fontSize: 12,
                    cursor: "pointer"
                  },
                  children: "紹介なしに戻す"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV(Card, {
            style: {
              marginBottom: 14,
              padding: 14
            },
            children: /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap"
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  gap: 6
                },
                children: CATS.map(c => /*#__PURE__*/_jsxDEV("button", {
                  onClick: () => setCat(c),
                  style: {
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    background: cat === c ? C.beni : "#F4EDEE",
                    color: cat === c ? "#fff" : C.sub
                  },
                  children: c
                }, c, false))
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                value: q,
                onChange: e => setQ(e.target.value),
                placeholder: "商品名で検索",
                style: {
                  border: `1px solid ${C.line}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  flex: 1,
                  minWidth: 140
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
                value: sort,
                onChange: e => setSort(e.target.value),
                style: {
                  border: `1px solid ${C.line}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  fontSize: 13,
                  background: "#fff"
                },
                children: [/*#__PURE__*/_jsxDEV("option", {
                  value: "std",
                  children: "おすすめ順"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  value: "asc",
                  children: "価格が安い順"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  value: "desc",
                  children: "価格が高い順"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  value: "subFirst",
                  children: "定期対応を先に"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontSize: 12,
                  color: C.sub
                },
                children: [filtered.length, "件 / 全", products.length, "件"]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: 12
            },
            children: [filtered.map(p => /*#__PURE__*/_jsxDEV(Card, {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: 12
              },
              children: [/*#__PURE__*/_jsxDEV(ProductImage, {
                p: p
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  gap: 6
                },
                children: [/*#__PURE__*/_jsxDEV(Chip, {
                  tone: p.cat === "美容" ? "beni" : p.cat === "健康" ? "green" : "gold",
                  children: p.cat
                }, void 0, false), p.sub && /*#__PURE__*/_jsxDEV(Chip, {
                  tone: "green",
                  children: "定期あり"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontWeight: 700,
                  fontSize: 14,
                  minHeight: 40
                },
                children: p.name
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontFamily: serif,
                  fontSize: 20,
                  color: C.beniDeep
                },
                children: yen(p.price)
              }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
                onClick: () => buy(p, false),
                style: {
                  background: C.beni,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 0",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer"
                },
                children: "単品で購入"
              }, void 0, false), p.sub && /*#__PURE__*/_jsxDEV("button", {
                onClick: () => buy(p, true),
                style: {
                  background: "#fff",
                  color: C.green,
                  border: `1.5px solid ${C.green}`,
                  borderRadius: 8,
                  padding: "8px 0",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer"
                },
                children: "定期で購入(毎月お届け)"
              }, void 0, false)]
            }, p.id, true)), filtered.length === 0 && /*#__PURE__*/_jsxDEV(Card, {
              style: {
                gridColumn: "1 / -1",
                textAlign: "center",
                color: C.sub,
                fontSize: 13
              },
              children: "条件に合う商品がありません。検索語やカテゴリを変えてみてください。"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), shopTab === "mypage" && /*#__PURE__*/_jsxDEV(React.Fragment, {
          children: [/*#__PURE__*/_jsxDEV(Card, {
            style: {
              marginBottom: 16
            },
            children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
              children: "定期購入中の商品"
            }, void 0, false), yourSubs.filter(s => s.active).length === 0 && /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 13,
                color: C.sub
              },
              children: "現在、定期購入中の商品はありません。"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 12
              },
              children: [yourSubs.filter(s => s.active).map(s => /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  border: `1px solid ${C.line}`,
                  borderRadius: 12,
                  padding: 12
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  style: {
                    width: 56
                  },
                  children: /*#__PURE__*/_jsxDEV(ProductImage, {
                    p: s.product,
                    size: 56,
                    height: 56,
                    radius: 8
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    flex: 1,
                    minWidth: 160
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontWeight: 700,
                      fontSize: 14
                    },
                    children: s.product.name
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontSize: 12,
                      color: C.sub,
                      marginTop: 2
                    },
                    children: [s.since, " 開始 ・ 毎月 ", yen(s.product.price), " ・ 次回お届け 2026-08-01"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(Chip, {
                  tone: "green",
                  children: "定期購入中"
                }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
                  onClick: () => cancelSub(s.id),
                  style: {
                    border: `1px solid ${C.gray}`,
                    color: C.sub,
                    background: "#fff",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  },
                  children: "解約する"
                }, void 0, false)]
              }, s.id, true)), yourSubs.filter(s => !s.active).map(s => /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  border: `1px dashed ${C.line}`,
                  borderRadius: 12,
                  padding: 12,
                  opacity: 0.6
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  style: {
                    width: 56
                  },
                  children: /*#__PURE__*/_jsxDEV(ProductImage, {
                    p: s.product,
                    size: 56,
                    height: 56,
                    radius: 8
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    flex: 1,
                    minWidth: 160
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontWeight: 700,
                      fontSize: 14
                    },
                    children: s.product.name
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontSize: 12,
                      color: C.sub,
                      marginTop: 2
                    },
                    children: "解約済み(今月分までお届け・来月から課金停止)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(Chip, {
                  tone: "gray",
                  children: "解約済み"
                }, void 0, false)]
              }, s.id, true))]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
              children: "購入履歴"
            }, void 0, false), yourOrders.length === 0 && /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 13,
                color: C.sub
              },
              children: "まだ購入履歴がありません。"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 8
              },
              children: yourOrders.slice().reverse().map(o => /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  borderBottom: `1px solid ${C.line}`,
                  paddingBottom: 8,
                  flexWrap: "wrap"
                },
                children: [/*#__PURE__*/_jsxDEV("span", {
                  style: {
                    color: C.sub,
                    width: 66
                  },
                  children: o.month
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    flex: 1,
                    minWidth: 140,
                    fontWeight: 700
                  },
                  children: o.product
                }, void 0, false), /*#__PURE__*/_jsxDEV(Chip, {
                  tone: o.type === "定期" ? "green" : "beni",
                  children: [o.type, o.subMonth ? ` ${o.subMonth}ヶ月目` : ""]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontWeight: 700
                  },
                  children: yen(o.price)
                }, void 0, false)]
              }, o.id, true))
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub,
                marginTop: 12
              },
              children: "※本番ではお客様もログイン制になり、自分の履歴だけが表示されます。領収書の発行やお届け先の変更もここに置けます。"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), role === "partner" && !auth.partner && /*#__PURE__*/_jsxDEV(LoginGate, {
        kind: "partner"
      }, void 0, false), role === "partner" && auth.partner && /*#__PURE__*/_jsxDEV(React.Fragment, {
        children: [/*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              fontSize: 13,
              color: C.sub
            },
            children: "ログイン中:"
          }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
            value: me,
            onChange: e => setMe(e.target.value),
            style: {
              border: `1px solid ${C.line}`,
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 13,
              background: "#fff"
            },
            children: PARTNERS.map(p => /*#__PURE__*/_jsxDEV("option", {
              children: p.code
            }, p.code, false))
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            style: {
              fontSize: 11,
              color: C.gray
            },
            children: "※デモ用の切替。本番は自分のアカウントのみ"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            borderRadius: 16,
            padding: 22,
            marginBottom: 16,
            color: "#fff",
            background: `linear-gradient(135deg, ${C.beniDeep} 0%, ${C.beni} 70%, #C85A78 100%)`
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 10
            },
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontSize: 11,
                  opacity: 0.85,
                  letterSpacing: "0.2em"
                },
                children: "AISHITOTO PARTNER"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontFamily: serif,
                  fontSize: 30,
                  letterSpacing: "0.1em",
                  marginTop: 4
                },
                children: me
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontSize: 12,
                  opacity: 0.85,
                  marginTop: 2
                },
                children: ["登録 ", (PARTNERS.find(p => p.code === me) || {}).joined]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              style: {
                textAlign: "right"
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontSize: 11,
                  opacity: 0.85
                },
                children: "今月の見込み報酬"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontFamily: serif,
                  fontSize: 26
                },
                children: yen(mySum("未確定"))
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              marginTop: 16,
              background: "rgba(255,255,255,0.14)",
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 13,
                flex: 1,
                minWidth: 200,
                wordBreak: "break-all"
              },
              children: ["あなたの紹介URL: ", /*#__PURE__*/_jsxDEV("b", {
                children: ["https://shop.aishitoto.jp/?ref=", me]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
              onClick: () => say("紹介URLをコピーしました"),
              style: {
                background: "#fff",
                color: C.beniDeep,
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "コピー"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 12,
            marginBottom: 16
          },
          children: [["未確定", "今月の見込み"], ["確定", "支払確定(来月頭に自動振込)"], ["支払済", "振込済み累計"]].map(([st, label]) => /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub
              },
              children: label
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: serif,
                fontSize: 22,
                color: st === "支払済" ? C.green : st === "確定" ? "#8F6A16" : C.ink,
                marginTop: 4
              },
              children: yen(mySum(st))
            }, void 0, false)]
          }, st, true))
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 14,
            alignItems: "start"
          },
          children: [/*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
              children: "あなたの紹介実績"
            }, void 0, false), myOrders.length === 0 && /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 13,
                color: C.sub
              },
              children: "まだ実績がありません。紹介URLをシェアしてみましょう。"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 8
              },
              children: myOrders.slice().reverse().slice(0, 10).map(o => /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  borderBottom: `1px solid ${C.line}`,
                  paddingBottom: 8
                },
                children: [/*#__PURE__*/_jsxDEV("span", {
                  style: {
                    flex: 1
                  },
                  children: o.product
                }, void 0, false), /*#__PURE__*/_jsxDEV(Chip, {
                  tone: o.type === "定期" ? "green" : "beni",
                  children: [o.type, o.subMonth ? ` ${o.subMonth}ヶ月目` : ""]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontWeight: 700
                  },
                  children: yen(o.price * commRate)
                }, void 0, false), statusChip(o.commStatus)]
              }, o.id, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
              children: "パートナーランキング(累計売上)"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 8
              },
              children: ranking.map(([code, amt], i) => /*#__PURE__*/_jsxDEV("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  fontSize: 13,
                  background: code === me ? C.beniPale : i < 3 ? C.goldPale : "transparent"
                },
                children: [/*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontFamily: serif,
                    width: 26,
                    fontSize: 16,
                    color: i < 3 ? C.gold : C.gray
                  },
                  children: i + 1
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontWeight: code === me ? 700 : 400,
                    flex: 1
                  },
                  children: [code, code === me && " (あなた)"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontWeight: 700
                  },
                  children: yen(amt)
                }, void 0, false)]
              }, code, true))
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), role === "admin" && !auth.admin && /*#__PURE__*/_jsxDEV(LoginGate, {
        kind: "admin"
      }, void 0, false), role === "admin" && auth.admin && /*#__PURE__*/_jsxDEV(React.Fragment, {
        children: [/*#__PURE__*/_jsxDEV("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 12,
            marginBottom: 16
          },
          children: [/*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub
              },
              children: "今月の売上"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: serif,
                fontSize: 22,
                marginTop: 4
              },
              children: yen(monthSales)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub
              },
              children: "累計売上"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: serif,
                fontSize: 22,
                marginTop: 4
              },
              children: yen(totalSales)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub
              },
              children: "登録パートナー"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: serif,
                fontSize: 22,
                marginTop: 4
              },
              children: [PARTNERS.length, "名"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                fontSize: 12,
                color: C.sub
              },
              children: "登録商品"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: serif,
                fontSize: 22,
                marginTop: 4
              },
              children: [products.length, "点 ", /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontSize: 12,
                  color: C.sub
                },
                children: "(上限なし)"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
          style: {
            marginBottom: 16
          },
          children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
            children: "商品管理(画像アップロード対応)"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontSize: 12,
              color: C.sub,
              marginBottom: 12
            },
            children: "「画像を登録」から写真を選ぶと、お客様画面の商品カードに即反映されます。本番ではクラウドストレージ(例: Cloudflare R2 / S3)に保存し、自動でリサイズ・軽量化します。"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: 320,
              overflowY: "auto"
            },
            children: products.map(p => /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 13,
                borderBottom: `1px solid ${C.line}`,
                paddingBottom: 10,
                flexWrap: "wrap"
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
                style: {
                  width: 52
                },
                children: /*#__PURE__*/_jsxDEV(ProductImage, {
                  p: p,
                  size: 52,
                  height: 52,
                  radius: 8
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontWeight: 700,
                  flex: 1,
                  minWidth: 160
                },
                children: p.name
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: yen(p.price)
              }, void 0, false), /*#__PURE__*/_jsxDEV(Chip, {
                tone: p.sub ? "green" : "gray",
                children: p.sub ? "定期あり" : "単品のみ"
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                type: "file",
                accept: "image/*",
                style: {
                  display: "none"
                },
                ref: el => fileRefs.current[p.id] = el,
                onChange: e => uploadImage(p.id, e.target.files && e.target.files[0])
              }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
                onClick: () => fileRefs.current[p.id] && fileRefs.current[p.id].click(),
                style: {
                  border: `1px solid ${C.beni}`,
                  color: C.beniDeep,
                  background: "#fff",
                  borderRadius: 8,
                  padding: "7px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer"
                },
                children: p.img ? "画像を変更" : "画像を登録"
              }, void 0, false)]
            }, p.id, true))
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
          style: {
            marginBottom: 16
          },
          children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
            children: "月次オペレーション(実運用では自動バッチ)"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [/*#__PURE__*/_jsxDEV("button", {
              onClick: chargeSubs,
              style: {
                background: C.green,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              },
              children: "① 定期の翌月課金を実行(Webhook受信を再現)"
            }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
              onClick: closeMonth,
              style: {
                background: C.gold,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              },
              children: "② 月次締め(未確定 → 確定)"
            }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
              onClick: payout,
              style: {
                background: C.beni,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              },
              children: "③ 月初の自動振込(Connect一括送金)"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontSize: 12,
              color: C.sub,
              marginTop: 10
            },
            children: "実運用: ①はStripeが毎月自動実行しWebhookで通知(お客様が解約した定期は自動で対象外) / ②は月末バッチ(返品分を控除) / ③は月初バッチで各パートナーの銀行口座へ自動送金。"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
          style: {
            marginBottom: 16
          },
          children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
            children: "分配ルール"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 10
            },
            children: rules.map(r => /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 13,
                flexWrap: "wrap",
                opacity: r.active ? 1 : 0.55
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontWeight: 700,
                  width: 130
                },
                children: r.label
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: serif,
                  fontSize: 16
                },
                children: [(r.rate * 100).toFixed(0), "%"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  color: C.sub,
                  flex: 1,
                  minWidth: 180
                },
                children: r.dest
              }, void 0, false), r.locked ? /*#__PURE__*/_jsxDEV(Chip, {
                tone: "green",
                children: "有効"
              }, void 0, false) : /*#__PURE__*/_jsxDEV("button", {
                onClick: () => {
                  setRules(rs => rs.map(x => x.id === r.id ? {
                    ...x,
                    active: !x.active
                  } : x));
                  say(r.active ? "システム利用料を無効化しました" : "システム利用料を有効化しました(実運用では契約締結後に設定)");
                },
                style: {
                  border: `1px solid ${r.active ? C.gray : C.green}`,
                  color: r.active ? C.sub : C.green,
                  background: "#fff",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer"
                },
                children: r.active ? "無効にする" : "有効にする"
              }, void 0, false)]
            }, r.id, true))
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(Card, {
          children: [/*#__PURE__*/_jsxDEV(SectionTitle, {
            children: "注文・報酬台帳"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              overflowX: "auto"
            },
            children: /*#__PURE__*/_jsxDEV("table", {
              style: {
                borderCollapse: "collapse",
                width: "100%",
                fontSize: 13,
                minWidth: 560
              },
              children: [/*#__PURE__*/_jsxDEV("thead", {
                children: /*#__PURE__*/_jsxDEV("tr", {
                  style: {
                    color: C.sub,
                    textAlign: "left"
                  },
                  children: ["月", "商品", "種別", "金額", "紹介", "報酬", "状態"].map(h => /*#__PURE__*/_jsxDEV("th", {
                    style: {
                      padding: "6px 8px",
                      borderBottom: `2px solid ${C.line}`,
                      fontWeight: 700
                    },
                    children: h
                  }, h, false))
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("tbody", {
                children: orders.slice().reverse().map(o => /*#__PURE__*/_jsxDEV("tr", {
                  children: [/*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: o.month
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: o.product
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: [o.type, o.subMonth ? `(${o.subMonth})` : ""]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: yen(o.price)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: o.partner || "—"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: o.partner ? yen(o.price * commRate) : "—"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    style: {
                      padding: "7px 8px",
                      borderBottom: `1px solid ${C.line}`
                    },
                    children: statusChip(o.commStatus)
                  }, void 0, false)]
                }, o.id, true))
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true), toast && /*#__PURE__*/_jsxDEV("div", {
      style: {
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: C.ink,
        color: "#fff",
        borderRadius: 10,
        padding: "12px 18px",
        fontSize: 13,
        maxWidth: "88vw",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        zIndex: 50
      },
      children: toast
    }, void 0, false)]
  }, void 0, true);
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/_jsxDEV(App, {}, void 0, false));
