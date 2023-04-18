import sys, time, os


def m(s):
    for c in s + '\n':
        sys.stdout.write(c)
        sys.stdout.flush()
        time.sleep(0.1)

print("""
    
    ██████╗░░█████╗░████████╗
    ██╔══██╗██╔══██╗╚══██╔══╝
    ██████╦╝██║░░██║░░░██║░░░
    ██╔══██╗██║░░██║░░░██║░░░
    ██████╦╝╚█████╔╝░░░██║░░░
    ╚═════╝░░╚════╝░░░░╚═╝░░░
      ░ ░\x1b[00m\033[041m TERMUX TELEGRAM BOT Lxrd kiny  \033[00m\x1b>
        ░ ░   ░   ░    ░ ░   ░    ░   ░   ░\x1b[00m
""")
m('\x1b[00m\033[041m Iniciando...  \033[00m')
m("Iniciado sucesso")
os.system("node index.js")
m("FEITO")
