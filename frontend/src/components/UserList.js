import React from 'react';
import { Table } from 'semantic-ui-react'

const UsersList = props => {
  const userRows = props.users.map(user => (
    <Table.Row key={user.id}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.blogs.length}</Table.Cell>
    </Table.Row>
  ));
  return <div>
      <h2>Users</h2>
      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User name</Table.HeaderCell>
            <Table.HeaderCell>Blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{userRows}</Table.Body>
      </Table>
    </div>;
}

export default UsersList;