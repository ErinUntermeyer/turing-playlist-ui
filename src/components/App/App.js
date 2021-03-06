import React, { Component } from 'react'
import Form from '../Form/Form'
import Songs from '../Songs/Songs'
import './App.css'
import SongController from '../SongController/SongController'
import { getSongs, postSong } from '../../helpers/apiCalls'

class App extends Component {
  constructor() {
    super()
    this.state = {
      songQueue: []
    }
	}
	
	componentDidMount() {
		getSongs()
			.then(data => {
				this.setState({ songQueue: data })
			})
	}

	addSong = (song, artist, link) => {
		const newSong = {
			songName: song,
			artistName: artist,
			link: link
		}
		postSong(newSong)
			.then(data => {
				this.setState({ songQueue: [...this.state.songQueue, data] })
			})
			.catch(error => {
				console.log(error)
			})
	}


  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Turing Playlist</h1>
        </header>
        <div className='App-background'>
          <main>
						<Form addSong={this.addSong} />
						<Songs allSongs={this.state.songQueue} />
          </main>
        </div> 
      </div>
    )
  }
}

export default App
