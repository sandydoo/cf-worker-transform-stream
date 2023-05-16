A proof-of-concept Cloudflare worker that modifies a stream of bytes.

In this example, we fetch an upstream HTML page and stream the back the
response, printing out the total number of bytes sent on every processed chunk.

Start a development server:

```bash
$ nix develop
$ wrangler dev
```

Test the worker:

```bash
$ curl http://localhost:8787
Request from: 127.0.0.1
Sent 1256 bytes
GET / 200 OK (837.96ms)
```
