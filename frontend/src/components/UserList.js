import React from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

const UserList = props => {
  const users = props.users.map(user => (
    <Table.Row key={user.id}>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </Table.Cell>
      <Table.Cell>{user.blogs.length}</Table.Cell>
    </Table.Row>
  ));

  return <div className="users">
      <h2>Users</h2>
      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h3>User name</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>Blogs</h3>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{users}</Table.Body>
      </Table>
    </div>;
};

export default UserList
