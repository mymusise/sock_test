import socket

def main():
	host="127.0.0.1"
	port="8001"

	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
	sock.connect((host,int(port)))

	sock.send('hehe:test1')
	sock.close()
	pass

if __name__ == '__main__':
	main()