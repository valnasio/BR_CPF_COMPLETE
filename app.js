// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Função para buscar filiais
function getFiliais(callback) {
    db.all('SELECT DISTINCT filial FROM ramais', [], callback);
}

// Rota principal para exibir ramais
app.get('/', (req, res) => {
    db.all('SELECT * FROM ramais', [], (err, rows) => {
        if (err) {
            throw err;
        }
        getFiliais((err, filiais) => {
            if (err) {
                throw err;
            }
            res.render('index', { ramais: rows, filiais });
        });
    });
});

// Rota para exibir o formulário com ramais existentes
app.get('/form', (req, res) => {
    db.all('SELECT * FROM ramais', [], (err, ramais) => {
        if (err) {
            throw err;
        }
        getFiliais((err, filiais) => {
            if (err) {
                throw err;
            }
            res.render('form', { ramais, filiais }); // Passando os ramais para a view
        });
    });
});

// Rota para filtrar ramais por filial
app.post('/filial', (req, res) => {
    const { filial } = req.body; // Obter a filial selecionada
    db.all('SELECT * FROM ramais WHERE filial = ?', [filial], (err, rows) => {
        if (err) {
            throw err;
        }
        getFiliais((err, filiais) => {
            if (err) {
                throw err;
            }
            res.render('index', { ramais: rows, filiais }); // Renderizar apenas os ramais filtrados
        });
    });
});

// Rota para adicionar um novo ramal - acesso apenas para administrador
app.post('/add', (req, res) => {
    const { filial, setor, pessoa, ramal } = req.body;
    db.run(`INSERT INTO ramais (filial, setor, pessoa, ramal) VALUES (?, ?, ?, ?)`, [filial, setor, pessoa, ramal], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/'); // Redireciona para a lista de ramais
    });
});

// Rota para editar ramal
app.post('/edit', (req, res) => {
    const { id, filial, setor, pessoa, ramal } = req.body;
    db.run(`UPDATE ramais SET filial = ?, setor = ?, pessoa = ?, ramal = ? WHERE id = ?`, [filial, setor, pessoa, ramal, id], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/'); // Redireciona para a lista de ramais
    });
});

// Rota para excluir ramal
app.post('/delete', (req, res) => {
    const { id } = req.body;
    db.run(`DELETE FROM ramais WHERE id = ?`, [id], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/'); // Redireciona para a lista de ramais
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
