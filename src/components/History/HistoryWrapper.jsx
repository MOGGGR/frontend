import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import CountDown from "@components/common/CountDown";
import styles from "./style.module.css";
import DialogueBox from "./DialogueBox";
import ScrumMaster from "./ScrumMaster";
import ModularBackGround from "./ModularBackGround";

function HistoryWrapper({dialogue, url}) {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [finishedHistory, setFinishedHistory] = useState(false);

	const handleClick = () => {
		setCurrentIndex((prev) => {
			const nextIndex = prev + 1;

			if (nextIndex === dialogue.length) {
				setFinishedHistory(true);
				return prev;
			}

			return nextIndex;
		});
	};

	const {scrumExpr, text, backGround} = dialogue[currentIndex];

	return (
		<div className={styles["historyWrapper"]}>
			<div className={styles["dialogueClickable"]} onClick={handleClick}>
				<DialogueBox text={text} />
			</div>
			<ScrumMaster scrumExpr={scrumExpr} pos={currentIndex} />
			<ModularBackGround backGround={backGround} />
			{finishedHistory && <CountDown onComplete={() => navigate(url)} />}
		</div>
	);
}

export default HistoryWrapper;
