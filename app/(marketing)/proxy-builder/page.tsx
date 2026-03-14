import { Suspense } from "react";

export const metadata = {
title:"Build Your Proxy — ProxiesSeller",
description:"Configure your proxy settings and launch instantly."
};

export default function ProxyBuilderPage({ searchParams }: any) {

const network = searchParams.network || "residential";
const session = searchParams.session || "sticky";

return (

<main className="bg-white min-h-screen">

<div className="max-w-5xl mx-auto px-4 py-20">

<h1 className="text-4xl font-bold text-slate-900">
Configure Your Proxy
</h1>

<p className="mt-4 text-slate-600">
Customize your proxy settings and launch instantly.
</p>

<div className="mt-10 bg-slate-50 border rounded-xl p-6">

<p className="text-sm text-slate-500">Network</p>
<p className="font-semibold text-lg capitalize">{network}</p>

<p className="text-sm text-slate-500 mt-4">Session</p>
<p className="font-semibold text-lg capitalize">{session}</p>

<p className="text-sm text-slate-500 mt-4">Protocol</p>
<p className="font-semibold text-lg">HTTP / SOCKS5</p>

<p className="text-sm text-slate-500 mt-4">Location</p>
<p className="font-semibold text-lg">Worldwide</p>

</div>


<div className="mt-10">

<a
href={`/checkout?network=${network}&session=${session}`}
className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold">
Buy Proxy Now
</a>

</div>

</div>

</main>

);
}
