.PHONY: help serve check

PORT ?= 8000

help:
	@echo "Comandos disponibles:"
	@echo "  make serve       Inicia el prototipo en http://localhost:$(PORT)"
	@echo "  make check       Comprueba la sintaxis de app.js"
	@echo "  Formulario UX:   http://localhost:$(PORT)/investigacion-usuarios.html"
	@echo "  make serve PORT=8080  Usa otro puerto"

serve:
	python3 -m http.server $(PORT)

check:
	node --check app.js
	node --check investigacion-usuarios.js
