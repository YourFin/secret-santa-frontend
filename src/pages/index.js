import React from "react"
import { Map, List } from "immutable"
import { StaticQuery, Link, graphql } from "gatsby"
import { randInt } from "../utils/math-util"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class InputTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      offsetid: randInt()
    }
  }

  renderTable(props) {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
          {
            props.people.map((person, index) => (
              <tr key={`row-${person.get("id")}`}>
                <td>{index+1}.</td>
                <td>
                  <input
                    type="text"
                    value={person.get("name")}
                    onChange={(e) => props.updateName(e.target.value, index)}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={person.get("email")}
                    onChange={(e) => props.updateEmail(e.target.value, index)}/>
                </td>
                <td>
                  <button onClick={(e) => props.removePerson(index)}>x</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }

  render() {
    return <StaticQuery
             query={graphql`
               query {
                 allPlaceholderNamesJson {
                   edges {
                     node {
                       email
                       name
                     }
                   }
                 }
               }
               `}
             render={data => {
                 const placeholders = data.allPlaceholderNamesJson.edges.map((item) => item.node);
                 return <this.renderTable placeholders={placeholders} {...this.props}/>
             }}
    />
  }
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.lastId = 0;
    this.state = {
      people: List([Map({
        name:"",
        email:"",
        id: this.genPersonId()
      })])
    }
  }

  genPersonId = () => {
    console.log(this.lastId);
    this.lastId += 1;
    return this.lastId;
  }

  addPerson = () => {
    this.setState((state, props) => ({
      people: state.people.push(Map({
        name:"",
        email:"",
        id: this.genPersonId()
      }))
    }));
  }

  removePerson = (index) => {
    this.setState((state, props) => {
      return ({
        people: state.people.delete(index)
      })
    })
  }

  updateName = (name, index) => {
    this.setState((state, props) => ({
      people: state.people.setIn([index, "name"], name)
    }))
  }

  updateEmail = (email, index) => {
    this.setState((state, props) => ({
      people: state.people.setIn([index, "email"], email)
    }))
  }

  render () {
    return (
      <div>
        <h3>Participants</h3>
        <InputTable
          people={this.state.people}
          updateEmail={this.updateEmail}
          updateName={this.updateName}
          removePerson={this.removePerson}
        />
        <button onClick={this.addPerson}>Add person</button>
      </div>
    );
  }
}

const list = List(["a", "b", "c", "d", "e"])
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <InputForm/>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
