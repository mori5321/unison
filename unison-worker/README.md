## Deploy

```
pnpm exec wrangler deploy
```


## Debug
```
wscat -c ws://127.0.0.1:8787/ws/editor
```

```
curl http://localhost:8787/editor -X PUT -d '{"elements": [{"text": "Hello", "color": "blue", "fontSize": "14px", "x": 100, "y": 100, "__tag": "__editorElementText"}]}'
```
