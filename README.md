This app is not ready for production yet. 
The code is held together by duct tape, it is my first Vue.js app and isn't very clean. 

To use, it needs a CORS proxy since browsers can't fetch from Torbox's API due to TB restricting CORS. The CORS proxy is written in Python with Flask (See proxy.py)

To run, at this time, you need to have Deno installed. You install the required libraries using Deno then run `deno run dev --host`
You also run the proxy with `python proxy.py`

This app is developped for myself and I don't plan on hosting the app nor on hosting the proxy for public use, since I would need to look into making everything more secure, and to pay for a hosting server.
