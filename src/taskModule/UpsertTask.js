import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { Radio } from "antd";
import "./TaskModule.css";

import PropTypes from "prop-types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const UpsertTask = ({ closeModal, addTask, updateTask, task }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
    }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    if (task) {
      values.id = task.id;
      console.log(values);
      updateTask(values);
    } else {
      addTask(values);
    }
    // addTask(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={task ? "Edit Product" : "Add New Product"}
      visible={true}
      onCancel={closeModal}
      width={"450px"}
      className="add-products-modal-wrapper"
      footer={[]}
    >
      <Form
        {...layout}
        form={form}
        name="Add/Edit Task"
        layout={"vertical"}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name={"title"}
          rules={[
            {
              required: true,
              message: "Please input title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={"description"}
          rules={[
            {
              required: true,
              message: "Please input Description!",
            },
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Completed"
          name={"completed"}
          rules={[
            {
              required: true,
              message: "Please select status!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...tailLayout} className="form-tail">
          <Button htmlType="button" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpsertTask;

// for validating prop-types
UpsertTask.propTypes = {
  closeModal: PropTypes.func,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  task: PropTypes.array,
};
