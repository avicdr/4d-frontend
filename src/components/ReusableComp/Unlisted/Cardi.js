import { Card } from "react-bootstrap";

const Cardi = () => {
    return (
      <Card style={{ width: "183px", margin: 5 }}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
        />
        <Card.Body style={{ padding: 0 }}>
          <select
            style={{
              width: "100%",
              borderRadius: 10,
              border: "none"
            }}
            className="form-select my-1"
            aria-label="Default select example"
          >
            <option selected="">Category</option>
          </select>
          <select
            style={{
              width: "100%",
              borderRadius: 10,
              border: "none"
            }}
            className="form-select my-1"
            aria-label="Default select example"
          >
            <option selected="">Tags</option>
          </select>
          <select
            style={{
              width: "100%",
              borderRadius: 10,
              border: "none"
            }}
            className="form-select my-1"
            aria-label="Default select example"
          >
            <option selected="">Color</option>
          </select>
        </Card.Body>
      </Card>
    );
  };
  export default Cardi