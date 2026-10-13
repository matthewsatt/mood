import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOneSong } from '../../store/songs'
import { loadUserMoods } from '../../store/moodlist'
import { usePlayer } from '../../context/Player'
import { Artwork, Icon, Rating } from '../ui'
import { moodStyle } from '../../utils/moodColors'
import './OneSong.css'

function OneSong() {
  const dispatch = useDispatch()
  const songId = Number(useParams().songId)
  const { current, isPlaying, toggle } = usePlayer()
  const [song, setSong] = useState(null)
  const [status, setStatus] = useState('loading')
  const mood = useSelector((state) =>
    song ? state.moodlists.find((m) => m.id === song.moodlistId) : undefined
  )

  useEffect(() => {
    let active = true
    setStatus('loading')
    Promise.all([dispatch(getOneSong(songId)), dispatch(loadUserMoods())]).then(([{ data }]) => {
      if (!active) return
      setSong(data || null)
      setStatus(data ? 'ready' : 'notfound')
    })
    return () => {
      active = false
    }
  }, [dispatch, songId])

  if (status === 'loading') {
    return <div className='spinner' role='status' aria-label='Loading song' />
  }

  if (status === 'notfound') {
    return (
      <main className='page'>
        <div className='container'>
          <div className='empty-state'>
            <h2>Song not found</h2>
            <p>It may have been removed, or it belongs to someone else.</p>
            <Link to='/' className='btn btn--secondary'>Back to your moods</Link>
          </div>
        </div>
      </main>
    )
  }

  const showPause = current && current.id === song.id && isPlaying

  return (
    <main className='page'>
      <div className='container'>
        <Link to={mood ? `/moodlists/${mood.id}` : '/'} className='back-link'>
          <Icon name='arrowLeft' size={16} />
          {mood ? mood.name : 'All moods'}
        </Link>

        <article className='song-detail'>
          <Artwork song={song} color={mood && mood.color} className='song-detail__art' />

          <div className='song-detail__info'>
            <p className='eyebrow'>Song</p>
            <h1 className='song-detail__title'>{song.name}</h1>
            <p className='song-detail__artist'>{song.artist}</p>

            <div className='song-detail__meta'>
              <Rating value={song.rating} />
              {mood && (
                <Link to={`/moodlists/${mood.id}`} className='chip'>
                  <span className='chip__dot mood-gradient' style={moodStyle(mood.color)} />
                  {mood.name}
                </Link>
              )}
            </div>

            {song.song_url ? (
              <button className='btn btn--primary btn--lg' onClick={() => toggle(song)}>
                <Icon name={showPause ? 'pause' : 'play'} size={18} />
                {showPause ? 'Pause' : 'Play'}
              </button>
            ) : (
              <p className='song-detail__note'>This song doesn't have an audio link yet.</p>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}

export default OneSong
