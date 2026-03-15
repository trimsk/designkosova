import http.server
import socketserver
import os

os.chdir('/Users/trimsokoli/Desktop/Design Kosova')
handler = http.server.SimpleHTTPRequestHandler
port = int(os.environ.get('PORT', 3001))
with socketserver.TCPServer(('', port), handler) as httpd:
    print(f'Serving on port {port}')
    httpd.serve_forever()
