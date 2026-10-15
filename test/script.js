
/*  1. as letrinha do gaster 

   Para trocar um símbolo, é só mudar o valor da linha. */

const SIMBOLOS = {
  A: "✌", B: "👌", C: "👍", D: "👎", E: "☜", F: "☞", G: "☝", H: "☟", I: "✋",
  J: "☺", K: "😐", L: "☹", M: "💣", N: "☠", O: "⚐", P: "🏱", Q: "✈", R: "☼",
  S: "💧", T: "❄", U: "🕆", V: "✞", W: "🕈", X: "✠", Y: "✡", Z: "☪",

  a: "♋", b: "♌", c: "♍", d: "♎", e: "♏", f: "♐", g: "♑", h: "♒", i: "♓",
  j: "🙰", k: "🙵", l: "●", m: "❍", n: "■", o: "□", p: "🞐", q: "❑", r: "❒",
  s: "⬧", t: "⧫", u: "◆", v: "❖", w: "⬥", x: "⌧", y: "⍓", z: "⌘",

  0: "📁", 1: "📂", 2: "📄", 3: "🗏", 4: "🗐",
  5: "🗄", 6: "⌛", 7: "🖮", 8: "🖰", 9: "🖲",
};

const FORCAR_TEXTO = "\uFE0E";

/* pra n bugar (ex.: "ã" ->> "a"). */
const REMOVER_ACENTOS = true;


/*  2. o tradutor né?  */

// tabela inversa (símbolo -> letra), criada automaticamente
const LETRAS = Object.fromEntries(
  Object.entries(SIMBOLOS).map(([letra, simbolo]) => [simbolo, letra])
);

function limparAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// text -> gasterr
function paraGaster(texto) {
  if (REMOVER_ACENTOS) texto = limparAcentos(texto);

  return Array.from(texto)
    .map((caractere) => {
      const simbolo = SIMBOLOS[caractere];
      return simbolo ? simbolo + FORCAR_TEXTO : caractere; // pra n troca o simboluss
    })
    .join("");
}

// gasterr -> text
function paraTexto(texto) {
  texto = texto.replaceAll(FORCAR_TEXTO, "");

  return Array.from(texto)
    .map((caractere) => LETRAS[caractere] ?? caractere)
    .join("");
}


/*  3. elementinhus pag */
const entrada = document.getElementById("entrada");
const saida = document.getElementById("saida");
const botaoCopiar = document.getElementById("copiar");
const botoesModo = document.querySelectorAll(".modo");
const rotuloEntrada = document.getElementById("rotulo-entrada");
const rotuloSaida = document.getElementById("rotulo-saida");

let modoAtual = "para-gaster";

// isso ajuda a digitar a vontade
const TEXTOS = {
  "para-gaster": { entrada: "Escreva seu texto", saida: "Tradução em Gaster" },
  "para-texto": { entrada: "Cole o texto em Gaster", saida: "Tradução em texto" },
};


/*  4 everton  */

// atualiza o resultado sempre que algo muda né
function atualizar() {
  const resultado = modoAtual === "para-gaster"
    ? paraGaster(entrada.value)
    : paraTexto(entrada.value);

  saida.textContent = resultado;
  saida.classList.toggle("gaster", modoAtual === "para-gaster");
}

// troca o modo né
botoesModo.forEach((botao) => {
  botao.addEventListener("click", () => {
    modoAtual = botao.dataset.modo;

    botoesModo.forEach((b) => b.classList.toggle("ativo", b === botao));
    rotuloEntrada.textContent = TEXTOS[modoAtual].entrada;
    rotuloSaida.textContent   = TEXTOS[modoAtual].saida;

    atualizar();
  });
});

// traduzz enquanto o bunito digita né
entrada.addEventListener("input", atualizar);

// copiar a copia
botaoCopiar.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(saida.textContent);
    botaoCopiar.textContent = "Copiado!";
  } catch {
    botaoCopiar.textContent = "Não foi possível copiar";
  }
  setTimeout(() => (botaoCopiar.textContent = "Copiar"), 1500);
});

atualizar();


//:¨·.·¨:
//`·. me da 5 rsrs ♥
//▬▬▬▬▬▬▬▬▬▬▬x▬▬▬
