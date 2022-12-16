import { Button, Result } from "antd";

const Forbidden = () => (
  <Result
    status="403"
    title="Forbidden Access"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button href="/" type="primary">
        Back Home
      </Button>
    }
  />
);

export default Forbidden;
