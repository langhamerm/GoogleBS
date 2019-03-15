import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, SearchBtn } from "../components/Form";
// import SearchResults from "../components/SearchResults";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
        image: this.state.image,
        link: this.state.link
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
    else if (this.state.title) {
      API.searchBooks(this.state.title)
      .then(res => {
        console.log(res.data.items);
        this.setState({ books: [...res.data.items] });
      })
      .catch(err => this.setState({ error: err.message }));
    }
  };

  handleSaveBook = props => {
    // event.preventDefault();
    API.saveBook({
      title: props.books.book.volumeInfo.title,
      author: props.books.book.volumeInfo.authors,
      synopsis: props.books.book.volumeInfo.description,
      image: props.books.book.volumeInfo.imageLinks.smallThumbnail,
      link: props.books.book.volumeInfo.infoLink

    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
};
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required only for Manual Book Save)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (required only for Manual Book Save)"
              />
              <Input
                value={this.state.image}
                onChange={this.handleInputChange}
                name="image"
                placeholder="Image Link (required only for Manual Book Save)"
              />
              <Input
                value={this.state.link}
                onChange={this.handleInputChange}
                name="googleapilink"
                placeholder="Google Books API Link (required only for Manual Book Save)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Save Book
              </FormBtn>
              <SearchBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </SearchBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        {/* <Row>
          {this.state.books.length > 0 && <SearchResults handleSaveBook={this.handleSaveBook} />}
        </Row> */}
      </Container>
    );
  }
}

export default Books;
