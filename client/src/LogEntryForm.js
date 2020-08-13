import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (data) => {
    try {
      setLoading(true);
      data.latitude = props.location.latitude;
      data.longitude = props.location.longitude;
      const created = await createLogEntry(data);
      props.onClose();
      console.log(created);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="name">
      {error ? <h3>{error}</h3> : null}
      <label>Title</label>
      <input name="title" required ref={register}></input>
      <label>Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label>Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label>Image</label>
      <input name="image" ref={register} />
      <label>Visit Date</label>
      <input name="visit" type="date" ref={register} />
      <button disabled = {loading}>{loading? 'Loading..' : 'Create Entry'}</button>
    </form>
  );
};

export default LogEntryForm;
