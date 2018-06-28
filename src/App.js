import React, {Component} from 'react'
import './App.css'
import {Board} from 'react-trello'

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends Component {
    state = {boardData: {lanes: []},pipelineData:{pipelinelanes:[]}}

    handleDragStart = (cardId, laneId) => {
        console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
    }

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
    }

    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        console.log(response)
        //console.log(response.pipelinelanes)
        
        this.setState({boardData: response})
        
        //this.setState({pipelineData: response.pipelinelanes})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
        })
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    }

    addCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'BLOCKED',
            card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
        })
    }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        console.log(nextData)
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
		console.dir(card)
	}

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h3>React Trello Demo</h3>
                </div>
                <div className="App-intro">
                 <Board
                        onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)}
                        editable
						onCardAdd={this.handleCardAdd}                  
                        id="EditableBoard1"
                        data={this.state.pipelineData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={this.handleDragStart.bind(this)}
                        handleDragEnd={this.handleDragEnd.bind(this)}
                    />
                    <Board
                        onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)}
                        editable
						onCardAdd={this.handleCardAdd}                  
                        id="EditableBoard1"
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={this.handleDragStart.bind(this)}
                        handleDragEnd={this.handleDragEnd.bind(this)}
                    />
                </div>
                

            </div>
        )
    }
}

export default App
