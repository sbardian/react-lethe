/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { Link } from 'react-router-dom'
import ListSettingsButton from '../buttons/list-settings-button/list-settings-button'
import DeleteListButton from '../buttons/delete-list-button/delete-list-button'
import RemoveUserFromListButton from '../buttons/remove-from-list-button/remove-user-from-list-button'

const Lists = ({ userId, lists, onDeleteList }) => (
  <ul
    data-testid="lists-ul"
    sx={{
      all: 'unset',
      display: 'grid',
      gap: 3,
      listStyle: 'none',
      padding: 3,
    }}
  >
    {lists.map((list) => (
      <li
        key={list.id}
        aria-label="list item"
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: '1fr auto',
          border: (theme) => `1px solid ${theme.colors.textSecondary}`,
          backgroundColor: 'offWhite',
          padding: '5px',
          color: 'textSecondary',
          paddingRight: 3,
          '&:hover': {
            webkitBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
            mozBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
            boxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
            backgroundColor: 'colorThree',
            color: 'text',
            border: '1px solid transparent',
          },
          '@media (min-width: 800px)': {
            gridTemplateColumns: '1fr 80px',
          },
        }}
      >
        <Link
          aria-label="link to list"
          to={`/lists/${list.id}`}
          sx={{
            textDecoration: 'none',
            height: '100%',
            alignContent: 'center',
            display: 'grid',
            marginLeft: 3,
            color: 'inherit',
          }}
        >
          <span>{list.title}</span>
        </Link>
        <div
          sx={{
            display: 'grid',
            gap: 3,
            justifyItems: 'center',
            '@media (min-width: 800px)': {
              gridTemplateColumns: '30px 30px',
            },
          }}
        >
          <ListSettingsButton listId={list.id} hoverColor="text" />
          {userId === list.owner.id ? (
            <DeleteListButton listId={list.id} onDeleteList={onDeleteList} />
          ) : (
            <RemoveUserFromListButton listId={list.id} userId={userId} />
          )}
        </div>
      </li>
    ))}
  </ul>
)

Lists.defaultProps = {
  lists: [],
}

Lists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onDeleteList: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default Lists
