import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		if (resp) {
			const text = await resp.text();
			expect(text).toMatchInlineSnapshot(`
				"<!doctype html>
				<html>
				<head>
				    <title>Example Domain</title>

				    <meta charset=\\"utf-8\\" />
				    <meta http-equiv=\\"Content-type\\" content=\\"text/html; charset=utf-8\\" />
				    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />
				    <style type=\\"text/css\\">
				    body {
				        background-color: #f0f0f2;
				        margin: 0;
				        padding: 0;
				        font-family: -apple-system, system-ui, BlinkMacSystemFont, \\"Segoe UI\\", \\"Open Sans\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif;
				        
				    }
				    div {
				        width: 600px;
				        margin: 5em auto;
				        padding: 2em;
				        background-color: #fdfdff;
				        border-radius: 0.5em;
				        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
				    }
				    a:link, a:visited {
				        color: #38488f;
				        text-decoration: none;
				    }
				    @media (max-width: 700px) {
				        div {
				            margin: 0 auto;
				            width: auto;
				        }
				    }
				    </style>    
				</head>

				<body>
				<div>
				    <h1>Example Domain</h1>
				    <p>This domain is for use in illustrative examples in documents. You may use this
				    domain in literature without prior coordination or asking for permission.</p>
				    <p><a href=\\"https://www.iana.org/domains/example\\">More information...</a></p>
				</div>
				</body>
				</html>
				"
			`);
		}
	});
});
