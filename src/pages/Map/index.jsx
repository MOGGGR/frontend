import React, {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import Card from "@components/Map/Card";
import Column from "@components/Map/Column";
import {useAuthStore} from "@stores/useAuth";
import Button from "@components/common/Button";
import {createAuthController} from "@controllers/auth";
import PlayerProfile from "@components/Map/PlayerProfile";

import styles from "./style.module.css";

const columns = [
	{id: 3, title: "To-do"},
	{id: 2, title: "In progress"},
	{id: 1, title: "Done"}
];

const cards = [
	{
		id: 3,
		title: "Task #3",
		route: "/wordle",
		difficulty: "hard",
		tags: [{label: "TASK", color: "blue"}],
		description: "Escrever documentação"
	},
	{id: 1, title: "Task #1", route: "/quiz", difficulty: "easy", description: "Responder o quiz de treinamento"},
	{
		id: 2,
		title: "Task #2",
		route: "/memory",
		difficulty: "easy",
		tags: [{label: "REFACTOR", color: "yellow"}],
		description: "Pair programming com o scrum"
	}
];

function Map() {
	const navigate = useNavigate();
	const {fetchUserData} = createAuthController();
	const userData = useAuthStore((state) => state.userMapRouteData);
	const contentRef = useRef(null);
	const lastCardRef = useRef(null);

	console.log(userData)

	useEffect(() => {
		fetchUserData();
	}, []);

	useEffect(() => {
		if (lastCardRef.current) {
			lastCardRef.current.scrollIntoView({behavior: "smooth", block: "end"});
		}
	}, [userData]);

	const userTasks = userData?.tasks || [];
	const currentTaskId = Math.max(...userTasks);

	const getColumnCards = (columnTitle) => {
		return cards.filter((card) => {
			if (columnTitle === "In progress") return card.id === currentTaskId;
			if (columnTitle === "Done") return userTasks.includes(card.id) && card.id !== currentTaskId;
			if (columnTitle === "To-do") return !userTasks.includes(card.id);
			return false;
		});
	};

	const visibleColumns = columns.filter((column) => getColumnCards(column.title).length > 0);

	return (
		<div ref={contentRef} className={styles["content"]}>
			<PlayerProfile name={`${userData.firstName} ${userData.lastName}`} tickets={userData.tickets} />
			<div className={styles["columns"]}>
				{visibleColumns.map((column) => {
					const columnCards = getColumnCards(column.title);
					return (
						<Column key={column.id} title={column.title} length={columnCards.length}>
							{columnCards.map((card, index) => (
								<Card
									key={card.title}
									onClick={() => navigate(card.route)}
									difficulty={card.difficulty}
									{...card}
									isToDo={column.title === "To-do"}
									ref={index === columnCards.length - 1 ? lastCardRef : null}
								/>
							))}
						</Column>
					);
				})}
			</div>
			<Button type="primary" size="medium" text="Voltar para a home" onClick={() => navigate("/")} />
		</div>
	);
}

export default Map;
