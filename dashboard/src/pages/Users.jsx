import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Users = (props) => {
  const [states, setStates] = useState({
    loading: true,
    users: [],
    error: ""
  })

  useEffect(() => {
    const endpoint = "http://localhost:3030/api/users?limit=10000";
    const getUsers = async () => {
      try {
        const { ok, data = [], msg = null } = await fetch(endpoint).then((res) => res.json());

        if(!ok) throw new Error(msg)

          console.log(data)
        ok && setStates({
          ...states,
          users: data,
          loading: false
        })
      } catch (error) {
        setStates({
          ...states,
          error: error.message
        })
      }
    };

    getUsers();

  }, []);

  return <h1>TODAS LOS USUARIOS</h1>;
};

Users.propTypes = {};

export default Users;
