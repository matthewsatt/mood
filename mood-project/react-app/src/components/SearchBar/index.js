import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchSongs } from '../../store/songs'
import { Icon } from '../ui'
import './SearchBar.css'

const MAX_RESULTS = 8

function SearchBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  // Refresh on focus so songs added or edited since last time show up
  const loadSongs = async () => {
    const { data } = await dispatch(searchSongs())
    if (data) setSongs(data)
  }

  // Case-insensitive match on title or artist. The same song can live in
  // several moodlists, so show each title/artist pair once.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const seen = new Set()
    const matches = []
    for (const song of songs) {
      const key = `${song.name}|${song.artist}`.toLowerCase()
      if (seen.has(key)) continue
      if (song.name.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q)) {
        seen.add(key)
        matches.push(song)
        if (matches.length === MAX_RESULTS) break
      }
    }
    return matches
  }, [query, songs])

  const goTo = (song) => {
    setQuery('')
    setOpen(false)
    history.push(`/songs/${song.id}`)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      goTo(results[active])
    } else if (e.key === 'Escape') {
      setQuery('')
      e.target.blur()
    }
  }

  const showResults = open && query.trim().length > 0

  return (
    <div className='search'>
      <Icon name='search' size={16} className='search__icon' />
      <input
        className='search__input'
        type='search'
        placeholder='Search your songs'
        aria-label='Search your songs'
        role='combobox'
        aria-expanded={showResults}
        aria-controls='search-results'
        aria-autocomplete='list'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
        }}
        onFocus={() => {
          setOpen(true)
          loadSongs()
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      {showResults && (
        <ul className='search__results' id='search-results' role='listbox'>
          {results.length > 0 ? (
            results.map((song, i) => (
              <li
                key={song.id}
                role='option'
                aria-selected={i === active}
                className={`search__result ${i === active ? 'search__result--active' : ''}`}
                // mousedown fires before the input's blur closes the list
                onMouseDown={(e) => {
                  e.preventDefault()
                  goTo(song)
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span className='search__result-icon'>
                  <Icon name='music' size={14} />
                </span>
                <span className='search__result-text'>
                  <span className='search__result-name'>{song.name}</span>
                  <span className='search__result-artist'>{song.artist}</span>
                </span>
              </li>
            ))
          ) : (
            <li className='search__empty'>No songs match “{query.trim()}”</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
