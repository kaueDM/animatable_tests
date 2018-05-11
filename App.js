import React from 'react'
import { sample } from 'lodash'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'

const BLUE = 'rgba(35, 122, 221, 1)'

const Container = styled.View`
flex: 1;
background-color: #fff;
align-items: center;
justify-content: flex-start;
padding-top: 35px;
`

const Title = styled.Text`
font-size: 22px;
`

const ChangeColor = styled.TouchableOpacity`
height: 250px;
width: 250px;
margin-top: 100px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${props => props.backgroundColor || BLUE}`

const TouchableLabel = styled.Text`
font-size: 20px;
font-weight: 600;
color: #fff;
`
const AnimatedContainer = Animatable.createAnimatableComponent(Container)
const AnimatedTitle = Animatable.createAnimatableComponent(Title)
const AnimatedChangeColor = Animatable.createAnimatableComponent(ChangeColor)

export default class App extends React.Component {
	
	constructor(props) {
		super(props)
		
		const containerRef = () => this.containerRef = containerRef
		
		this.state = {
			currentColor: null,
			colors: ['rgba(183, 40, 40, 1)', 'rgba(255, 251, 25, 1)', 'rgba(13, 186, 88, 1)', 'rgba(35, 122, 221, 1)']
		}
		
	}
	
	componentDidMount() {
		this.setState({ currentColor: sample(this.state.colors) })
	}
	
	render() {
		return (
			<AnimatedContainer animation='fadeIn' ref={this.containerRef}>
			<AnimatedTitle animation='pulse' iterationCount='infinite'>
			Animatable + Styled Components
			</AnimatedTitle>
			
			<AnimatedChangeColor 
			animation='fadeInDown'
			backgroundColor={this.state.currentColo}
			ref={colorChangeRef => this.colorChangeRef = colorChangeRef} 
			onPress={() => this._handlePress()}
			>
			<TouchableLabel>Touch me!</TouchableLabel>
			</AnimatedChangeColor>
			
			</AnimatedContainer>
		);
	}
	
	
	_handlePress = () => {
		const { currentColor, colors} = this.state
		console.log(currentColor)
		let newColor = sample(colors)
		this.colorChangeRef.transition({ backgroundColor: currentColor },{ backgroundColor: newColor }, 'ease-in-out-circ')
		this.colorChangeRef.rubberBand().then(() => this.setState({ currentColor: newColor }))
	}
}
