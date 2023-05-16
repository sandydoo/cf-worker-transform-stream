/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		// TODO: does this work?
		request.signal.addEventListener("abort", () => {
			console.log("Request aborted");
		});
		// request.signal.throwIfAborted();

		const ip = request.headers.get("CF-Connecting-IP");
		console.log("Request from: " + ip);

		let bytesSent = 0;

		const { readable, writable } = new TransformStream({
			start() { },

			async transform(chunk, controller) {
				controller.enqueue(chunk);
				bytesSent += chunk.length;
				console.log(`Sent ${bytesSent} bytes`);
			},

			flush() { },
		});

		const html = await fetch("https://www.example.org");

		html.body?.pipeTo(writable);

		return new Response(readable, { headers: { "Content-Type": "text/html" } });
	},
}
