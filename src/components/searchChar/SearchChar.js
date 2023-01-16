import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./searchChar.scss";

const SearchChar = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = char => {
        setChar(char);
    }

    const getChar = name => {
        clearError();

        getCharacterByName(name).then(onCharLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !char ? null : char ? 
        <div className="marvelForm__wrapper">
            <div className="marvelForm__wrapper__success">There is! Visit {char.name} page?</div>
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : <div className="marvelForm__error">The character was not found. Check the name and try again</div>

    return (
        <Formik
            initialValues={{
                charName: ''
            }}
            validationSchema={Yup.object({
                charName: Yup.string()
                            .required('This field is required')
            })}
            onSubmit = {values => {
                getChar(values.charName);
            }}
        >
            <Form className="marvelForm">
                <label htmlFor="charName" className="marvelForm__label">Or find a character by name:</label>
                <div className="marvelForm__wrapper">
                    <Field
                        id="charName"
                        name="charName"
                        type="text"
                        placeholder="Enter name"
                        />
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikErrorMessage component="div" name="charName" className="marvelForm__error"/>
                {errorMessage}
                {content}
            </Form>
        </Formik>
    )
}

export default SearchChar;