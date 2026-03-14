"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const countries = [
{code:"us",name:"United States"},
{code:"gb",name:"United Kingdom"},
{code:"de",name:"Germany"},
{code:"fr",name:"France"},
{code:"nl",name:"Netherlands"},
{code:"ru",name:"Russia"},
{code:"tr",name:"Turkey"},
{code:"cn",name:"China"},
{code:"br",name:"Brazil"},
{code:"in",name:"India"},
];

export default function ProxyBuilderPage(){

const router = useRouter();

const [network,setNetwork] = useState("residential");
const [session,setSession] = useState("sticky");
const [protocol,setProtocol] = useState("http");
const [location,setLocation] = useState("worldwide");
const [country,setCountry] = useState("us");

const generateSession = () =>
`session${Math.floor(Math.random()*900000)+100000}`;

const [sessionName,setSessionName] = useState(generateSession());


const ports = {
  http: 10000,
  socks5: 11000,
  ssl: 12000,
} as const;

const port = ports[protocol as keyof typeof ports];


const username =
`user,type_${network},session_${sessionName}${
location==="country"?`,country_${country}`:""
}`;

const proxyServer = "portal.proxiesseller.cc";
const password = "generated_password";

const copy = (text:string)=>navigator.clipboard.writeText(text);

const handleBuy = ()=>{

router.push(
`/checkout?network=${network}&session=${session}&protocol=${protocol}&location=${location}&country=${country}&session=${sessionName}`
);

};

return(

<main className="bg-white min-h-screen">

<div className="max-w-6xl mx-auto px-4 py-20">

<h1 className="text-4xl font-bold text-slate-900">
Build Your Proxy
</h1>

<p className="mt-3 text-slate-600 max-w-2xl">
Configure your proxy connection and instantly generate credentials for scraping,
automation, SEO monitoring, or social media tools.
</p>

<div className="grid md:grid-cols-2 gap-12 mt-12">

{/* CONFIGURATION */}

<div className="space-y-8">


{/* NETWORK */}

<div>

<p className="font-semibold mb-3">Network Type</p>

<div className="flex gap-3 flex-wrap">

{["residential","mobile","datacenter","fast"].map(n=>(
<button
key={n}
onClick={()=>setNetwork(n)}
className={`px-4 py-2 border rounded-lg capitalize ${
network===n?"bg-purple-600 text-white":""
}`}>
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
className={`px-4 py-2 border rounded-lg ${
session==="sticky"?"bg-purple-600 text-white":""
}`}>
Sticky
</button>

<button
onClick={()=>setSession("rotating")}
className={`px-4 py-2 border rounded-lg ${
session==="rotating"?"bg-purple-600 text-white":""
}`}>
Rotating
</button>

</div>

</div>


{/* SESSION NAME */}

<div>

<p className="font-semibold mb-3">Session Name</p>

<div className="flex gap-2">

<input
value={sessionName}
onChange={(e)=>setSessionName(e.target.value)}
className="border px-4 py-2 rounded-lg w-full"
/>

<button
onClick={()=>setSessionName(generateSession())}
className="px-4 py-2 border rounded-lg">
↻
</button>

</div>

<p className="text-xs text-slate-500 mt-2">
Using the same session name keeps the same IP for up to 60 minutes.
</p>

</div>


{/* PROTOCOL */}

<div>

<p className="font-semibold mb-3">Connection Type</p>

<div className="flex gap-3 flex-wrap">

{["http","socks5","ssl"].map(p=>(
<button
key={p}
onClick={()=>setProtocol(p)}
className={`px-4 py-2 border rounded-lg uppercase ${
protocol===p?"bg-purple-600 text-white":""
}`}>
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
className={`px-4 py-2 border rounded-lg ${
location==="worldwide"?"bg-purple-600 text-white":""
}`}>
Worldwide
</button>

<button
onClick={()=>setLocation("country")}
className={`px-4 py-2 border rounded-lg ${
location==="country"?"bg-purple-600 text-white":""
}`}>
Country
</button>

</div>

</div>


{/* COUNTRY SELECT */}

{location==="country" && (

<div>

<p className="font-semibold mb-3">Select Country</p>

<select
value={country}
onChange={(e)=>setCountry(e.target.value)}
className="border px-4 py-2 rounded-lg w-full">

{countries.map(c=>(
<option key={c.code} value={c.code}>
{c.name}
</option>
))}

</select>

</div>

)}


</div>


{/* CREDENTIAL PREVIEW */}

<div className="bg-slate-50 border rounded-xl p-6 h-fit">

<h3 className="text-xl font-semibold mb-6">
Proxy Credentials
</h3>

<div className="space-y-4">

<div>
<p className="text-sm text-slate-500">Proxy Server</p>
<div className="flex justify-between items-center">
<p className="font-mono">{proxyServer}</p>
<button onClick={()=>copy(proxyServer)}>Copy</button>
</div>
</div>

<div>
<p className="text-sm text-slate-500">Port</p>
<div className="flex justify-between items-center">
<p className="font-mono">{port}</p>
<button onClick={()=>copy(String(port))}>Copy</button>
</div>
</div>

<div>
<p className="text-sm text-slate-500">Username</p>
<div className="flex justify-between items-center">
<p className="font-mono break-all">{username}</p>
<button onClick={()=>copy(username)}>Copy</button>
</div>
</div>

<div>
<p className="text-sm text-slate-500">Password</p>
<div className="flex justify-between items-center">
<p className="font-mono">{password}</p>
<button onClick={()=>copy(password)}>Copy</button>
</div>
</div>

</div>


<button
onClick={handleBuy}
className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-semibold">

Buy Proxy Now

</button>

</div>


</div>

</div>

</main>

);
}
