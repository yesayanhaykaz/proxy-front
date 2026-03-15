"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const COUNTRIES = [
{ code:"us", name:"United States" },
{ code:"gb", name:"United Kingdom" },
{ code:"de", name:"Germany" },
{ code:"fr", name:"France" },
{ code:"nl", name:"Netherlands" },
{ code:"tr", name:"Turkey" },
{ code:"ru", name:"Russia" },
{ code:"br", name:"Brazil" },
{ code:"in", name:"India" }
];

const PRICE_TABLE:any = {
residential:2,
mobile:5,
datacenter:0.8,
fast:1.2
};

export default function ProxyBuilderPage(){

const router = useRouter();

const [network,setNetwork] = useState("residential");
const [session,setSession] = useState("sticky");
const [protocol,setProtocol] = useState("socks5");
const [location,setLocation] = useState("worldwide");
const [country,setCountry] = useState("us");
const [traffic,setTraffic] = useState(1);

const pricePerGb = PRICE_TABLE[network];
const totalPrice = (pricePerGb * traffic).toFixed(2);

const handleBuy = () => {

  const isLoggedIn = document.cookie.includes("ps_session=");

  const params = new URLSearchParams({
    plan: "custom",
    custom: "1",
    network,
    session,
    protocol,
    location,
    country,
    traffic: String(traffic),
  });

  if (!isLoggedIn) {
    router.push(`/auth/login?next=/checkout?${params.toString()}`);
    return;
  }

  router.push(`/checkout?${params.toString()}`);
};

return(

<main className="bg-white min-h-screen">

<div className="max-w-6xl mx-auto px-4 py-20">

<h1 className="text-4xl font-bold text-slate-900">
Build Your Proxy
</h1>

<p className="mt-4 text-slate-600 max-w-2xl">
Configure your proxy network, location and traffic. Your proxy credentials
will be generated instantly after purchase.
</p>

<div className="grid md:grid-cols-2 gap-12 mt-12">

{/* LEFT SIDE */}

<div className="space-y-8">

{/* NETWORK */}

<div>
<p className="font-semibold mb-3">Network Type</p>

<div className="flex gap-3 flex-wrap">

{["residential","mobile","datacenter","fast"].map(n=>(
<button
key={n}
onClick={()=>setNetwork(n)}
className={`px-4 py-2 rounded-xl border capitalize ${
network===n
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
{n}
</button>
))}

</div>
</div>


{/* SESSION */}

<div>

<p className="font-semibold mb-3">Session Type</p>

<div className="flex gap-3">

<button
onClick={()=>setSession("sticky")}
className={`px-4 py-2 border rounded-xl ${
session==="sticky"
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
Sticky
</button>

<button
onClick={()=>setSession("rotating")}
className={`px-4 py-2 border rounded-xl ${
session==="rotating"
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
Rotating
</button>

</div>

</div>


{/* PROTOCOL */}

<div>

<p className="font-semibold mb-3">Protocol</p>

<div className="flex gap-3">

{["http","socks5","ssl"].map(p=>(
<button
key={p}
onClick={()=>setProtocol(p)}
className={`px-4 py-2 border rounded-xl uppercase ${
protocol===p
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
{p}
</button>
))}

</div>

</div>


{/* LOCATION */}

<div>

<p className="font-semibold mb-3">Location</p>

<div className="flex gap-3">

<button
onClick={()=>setLocation("worldwide")}
className={`px-4 py-2 border rounded-xl ${
location==="worldwide"
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
Worldwide
</button>

<button
onClick={()=>setLocation("country")}
className={`px-4 py-2 border rounded-xl ${
location==="country"
? "bg-indigo-600 text-white border-indigo-600"
: "hover:bg-slate-100"
}`}
>
Country
</button>

</div>

</div>


{/* COUNTRY */}

{location==="country" && (

<div>

<p className="font-semibold mb-3">Select Country</p>

<select
value={country}
onChange={(e)=>setCountry(e.target.value)}
className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
>


{COUNTRIES.map(c=>(
<option key={c.code} value={c.code}>
{c.name}
</option>
))}

</select>

</div>

)}


{/* TRAFFIC */}

<div>

<p className="font-semibold mb-3">Traffic</p>

<select
value={traffic}
onChange={(e)=>setTraffic(Number(e.target.value))}
className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
>


<option value={1}>1 GB</option>
<option value={5}>5 GB</option>
<option value={10}>10 GB</option>
<option value={50}>50 GB</option>
<option value={100}>100 GB</option>

</select>

</div>

</div>


{/* RIGHT SUMMARY */}

<div className="bg-slate-50 border rounded-2xl p-8 h-fit">

<h3 className="text-xl font-semibold mb-6">
Order Summary
</h3>

<div className="space-y-3 text-sm">

<p>
<span className="text-slate-500">Network:</span>{" "}
<span className="capitalize font-medium">{network}</span>
</p>

<p>
<span className="text-slate-500">Session:</span>{" "}
<span className="capitalize font-medium">{session}</span>
</p>

<p>
<span className="text-slate-500">Protocol:</span>{" "}
<span className="uppercase font-medium">{protocol}</span>
</p>

<p>
<span className="text-slate-500">Location:</span>{" "}
<span className="capitalize font-medium">
{location==="worldwide"?"Worldwide":country.toUpperCase()}
</span>
</p>

<p>
<span className="text-slate-500">Traffic:</span>{" "}
<span className="font-medium">{traffic} GB</span>
</p>

</div>


<div className="border-t mt-6 pt-6">

<p className="text-sm text-slate-500">Price per GB</p>

<p className="text-lg font-semibold">
${pricePerGb}
</p>

<p className="text-sm text-slate-500 mt-2">
Estimated total
</p>

<p className="text-3xl font-bold text-indigo-600">
${totalPrice}
</p>

</div>


<button
onClick={handleBuy}
className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-500"
>
Buy Proxy
</button>


<p className="text-xs text-slate-500 mt-4">
Credentials will be generated instantly after purchase.
</p>

</div>

</div>

</div>

</main>

);
}
