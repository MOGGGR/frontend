import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./style.module.css";
import HistoryWrapper from "@components/History/HistoryWrapper";

const dialogueOptions = [
	{
		id: 0,
		dialogue: [
			{ text: "Fala, SEUNOME! Bem-vindo ao SoftExpert! Eu sou o Scrum Master, seu novo guia na jornada dos códigos.", scrumExpr: 1, backGround: 1 },
			{ text: "Temos um projetinho top para alguém recém-chegado como você! Vem cá que vou te mostrar…", scrumExpr: 1, backGround: 1 },
			{ text: "... Chegamos!", scrumExpr: 0, backGround: 0 },
			{ text: "Um Problema clássico de qualquer software: BUGS! Eles aparecem do nada...", scrumExpr: 0, backGround: 2 },
			{ text: "Decidimos criar a solução definitiva para acabar com todos os bugs do mundo!", scrumExpr: 0, backGround: 3 },
			{ text: "E adivinha? Você vai entrar bem na reta final dessa missão épica! Boa sorte!", scrumExpr: 1, backGround: 0 }
		],
    url: "/map"
	},
	{
		id: 1,
		dialogue: [
			{ text: "Ei jovem, como sua primeira tarefa preciso que você responda umas questões.", scrumExpr: 1, backGround: 1 },
			{ text: "Preparado?", scrumExpr: 1, backGround: 1 }
		],
    url: "/quiz"
	},
	{
		id: 2,
		dialogue: [
			{ text: "Tudo bom? Estava arrumando o nosso quadro do projeto, só que os emblemas das linguagens estão todos embaralhados...", scrumExpr: 3, backGround: 1 },
			{ text: "Você consegue organizar eles pra mim? Temos 1 par de cada, preciso que ache e agrupe os pares de mesma imagem", scrumExpr: 2, backGround: 1 },
			{ text: "Preparado?", scrumExpr: 1, backGround: 1 }
		],
    url: "/memory"
	},
	{
		id: 3,
		dialogue: [
			{ text: "Ah cara... estou escrevendo a documentação para a nossa solução contra os bugs, mas me deu um branco pra lembrar uma palavra aqui... pode me ajudar?", scrumExpr: 3, backGround: 1 },
			{ text: "Preparado?", scrumExpr: 1, backGround: 1 }
		],
    url: "/wordle"
	},
	{
		id: 4,
		dialogue: [
			{ text: "Parabéns! você finalizou seu treinamento. olha só, se tornou um grande profissional, eles crescem tão rápido...", scrumExpr: 2, backGround: 1 },
			{ text: "Agora para ir em busca de novos horizontes, visite nosso estande e bata um papo com o pessoal. Você terá uma recepção calorosa!", scrumExpr: 4, backGround: 1 },
			{ text: "Ah, quase me esqueci. Fique de olho na frase da vez, que fica à mostra lá no estande. Você também pode ganhar cupons ao enviar ela por aqui. Se cuida!", scrumExpr: 1, backGround: 1 },
			{ text: "Preparado?", scrumExpr: 1, backGround: 1 }
		],
    url: "/phrase"
	}
];

// DEPOIS FAZER COM A STORE DO JOGADOR
const level = 0

function History() {

  const currentDialogue = dialogueOptions.find(item => item.id === level)

	return (
		<div className={styles["content"]}>
			<HistoryWrapper dialogue={currentDialogue.dialogue} url={currentDialogue.url} />
		</div>
	);
}

export default History;
