import React, { useEffect, useState } from "react";
import Toolbar from "../../../Controls/Toolbar/Toolbar";
import Classes from './goodItem.module.scss'
import ToolbarSpacer from '../../../Controls/Toolbar/ToolbarSpacer/ToolbarSpacer'
import Dialog from "../../Dialog/Dialog";
let config = {
	field: 	[
		{0: "", 1: "", 2: ""},
		{0: "", 1: "", 2: ""},
		{0: "", 1: "", 2: ""},
		],
		steps: {
			O: [],
			X: []
		}
}

function Game (props) {
	let [writeSteps, setWriteSteps] = useState(JSON.parse(JSON.stringify(config.steps)))
	let [winCounter, setWinCounter] = useState({O: 0, X: 0})
	let [figure, setFigure] = useState('O');
	let [win, setWin] = useState("")
	let [field, setField] = useState(JSON.parse(JSON.stringify(config.field)))
	useEffect(() => {
		const currentStepPlayer = figure == 'X' ? 'O' : 'X'
		const isWin = winHandler(currentStepPlayer, writeSteps);
		if (isWin) {
			if (isWin.winner) setWinCounter(prevState => {
				prevState[currentStepPlayer]++
				return prevState
			})
			setWriteSteps(JSON.parse(JSON.stringify(config.steps)))
			setField(JSON.parse(JSON.stringify(config.field)))
			setWin(isWin.text);
			setTimeout(() => {
			setWin("")
			}, 3000)
		}
	}, [figure]);

	function winHandler(currentStepPlayer, writeSteps) {
		let aAllSteps = Object.keys(writeSteps).reduce((acc, el) => {
			acc.push(...writeSteps[el])
			return acc
		},[])
		let findFirst = writeSteps[currentStepPlayer].find(el => el.col == 0 && el.row == 2) 
		let findSecond = writeSteps[currentStepPlayer].find(el => el.col == 1 && el.row == 1)
		let findThird = writeSteps[currentStepPlayer].find(el => el.col == 2 && el.row == 0)
		const speciphic = findFirst && findSecond && findThird
		writeSteps[currentStepPlayer].sort((a, b) => a.col - b.col).sort((a, b) => a.row - b.row)
		const col = writeSteps[currentStepPlayer].reduce(
			(acc, x) => {
				const last_element = acc[acc.length - 1];
				if (last_element && last_element[0] === x.col) {
					last_element[1]++;
				} else {
					acc.push([x.col, 1]);
				}
				return acc;
			},
			[]
		);
		const seriesCol = col.sort((a, b) => b[1] - a[1])[0];
		const row = writeSteps[currentStepPlayer].reduce(
			(acc, x) => {
				const last_element = acc[acc.length - 1];
				if (last_element && last_element[0] === x.row) {
					last_element[1]++;
				} else {
					acc.push([x.row, 1]);
				}
				return acc;
			},
			[]
		);
		const seriesRow = row.sort((a, b) => b[1] - a[1])[0];
		let isWinBySame = writeSteps[currentStepPlayer].reduce((acc, step) => {
			let isAllAreSame = acc.every(el => el.col === el.row)
			if (step.col === step.row && isAllAreSame){
				acc.push(step)
			}
			return acc
		}, [])
		if (seriesCol && seriesCol[seriesCol.length - 1] === 3 || seriesRow && seriesRow[seriesRow.length - 1] === 3 || isWinBySame.length === 3 || speciphic) {
			return {text: `Игрок "${currentStepPlayer}" одержал победу`, winner: currentStepPlayer}
		} else if (aAllSteps.length === 9) {
			return {text: `Игра завершилась ничьей, победила дружба:)`}
		} else {
			return false
		}
	}
	function onFieldClick(row, col, turnFigure) {
		setWriteSteps(prevStep => {
			if (field[row][col]) {
				return prevStep;
			} else {
				prevStep[figure].push({row, col: +col})
			}
			return prevStep
		})
		setField(prevField => {
			if (!prevField[row][col]) prevField[row][col] = turnFigure;
			return prevField;
		})
		setFigure(prevFigure => {
			return prevFigure === 'O' ? 'X' : 'O';
		})
	}
	return (
		<div className={Classes.desc}>
			<Toolbar>
			<h1 className={Classes.title}>Крестики-нолики</h1>
			<ToolbarSpacer/>
			<div className={Classes.statistics}>
				{Object.keys(winCounter).map((winKey, i)=> <div key={i}>
					<div>
					<h3 className={Classes[`icon__${winKey}`]}>{winKey}: {winCounter[winKey]}</h3>
					</div>
				</div>)}
			</div>
			</Toolbar>
			<div className={Classes.field}>
			{/* {win ? 
			<Dialog>
				<h1>{win}</h1>	
			</Dialog> 
			: null} */}
			<Dialog></Dialog>
				{field.map((row, rowCount) => {
					return <div  className={Classes.field__row}>{Object.keys(row).map((col, colCount) => {
						let colored = rowCount % 2 == 0 ? (colCount % 2 == 0 ? Classes.field__col_even : Classes.field__col_odd) : (colCount % 2 == 0 ? Classes.field__col_odd : Classes.field__col_even)
						return <div className={`${Classes.field__col} ${colored}`} onClick={() => onFieldClick(rowCount, col, figure)}><span className={Classes[`icon__${row[col]}`]}>{row[col]}</span></div>
					})}</div>
				}) }
			</div>
		</div>
	)
}

export default Game