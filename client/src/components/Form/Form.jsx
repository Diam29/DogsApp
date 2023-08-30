import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsTemp, postDog } from '../../redux/actions';
import axios from "axios";
import { Link } from "react-router-dom";
import s from './Form.module.css'

const Form = () => {
  const dispatch = useDispatch();

  // elegir los temperamentos disponibles
  const dogTemp = useSelector((state) => state.dogTemp);


  const tempDog = useSelector((state) => state.createdDogs)

  console.log('dogtemp create', dogTemp);

  // todos los temperamentos seleccionados
  // const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  // console.log('setSelectedTemperaments', selectedTemperaments);


  // perro creado por medio al formulario

  const [form, setForm] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: [],
    // temperament: ''
  });


  // validacion de formulario
  const [error, setError] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: [],
    // temperament: ''
  });


  // funcion para validacion de formulario
  const validate = (form) => {
    const regexImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

    let error = {}

    form.name ? error.name = '' : error.name = 'Este campo es obligatorio';
    regexImg.test(form.image) ? error.image = '' : error.image = 'La url no es valida';
    form.height ? error.height = '' : error.height = 'Es obligatorio indicar altura';
    form.weight ? error.weight = '' : error.weight = 'Es obligatorio el peso';
    form.life_span ? error.life_span = '' : error.life_span = 'Debe indicar años';
    form.temperament ? error.temperament = [] : error.temperament = 'Debe ingresar un teperamento';
    // form.temperament ? error.temperament = '' : error.temperament = 'Debe ingresar un teperamento';


    return error;
  };

  // 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError(validate({ ...form, [name]: value }));
    setForm({ ...form, [name]: value });
    console.log('form', form, 'name', name, 'value', value);
  };

  // const handleSelect = (event) => {
  //   const selectedTemperament = event.target.value;
  //   setForm({ ...form, temperament: [...form.temperament, selectedTemperament] });
  //   console.log(form.temperament, 'valor de temperametos');
  // };


  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    console.log('Selected Temperament:', selectedTemperament);
    setForm({ ...form, temperament: [...form.temperament, selectedTemperament] });
    console.log('Updated Temperaments:', form.temperament);
  };



  // const handleSelect = (event) => {
  //   setForm({ ...form, temperament: [...form.temperament, form.temperament = [event.target.value]] });
  //   console.log(form.temperament, 'valor de temperametos');
  // };
  // const handleSelect = (event) => {
  //   const selectedTemperament = event.target.value;
  //   setForm({ ...form, temperament: [...form.temperament, selectedTemperament] });
  // };

  // const handleSelect = (event) => {
  //   const selectedTemperament = event.target.value;
  //   setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
  //   setForm({ ...form, temperament: selectedTemperament });
  // };

  // resetear formulario
  const resetForm = () => {
    setForm({
      name: '',
      image: '',
      height: '',
      weight: '',
      life_span: '',
      temperament: [],
      // temperament: '',

    })
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     if (form.name && form.height && form.image && form.weight && form.life_span && form.temperament) {
  //       await dispatch(getDogsTemp());
  //       console.log(form.temperament, 'from temperamet');
  //       const res =
  //         await axios
  //           .post(`http://localhost:3001/dogs/`, form)
  //           // .then(res=>{alert('Se creo correctamente el perro')
  //           .then((res) => alert('se creo correctamente el perro', res))
  //       resetForm()
  //       console.log('res', res);
  //     }
  //   } catch (err) {
  //     alert(err.message, 'soy error')

  //   }
  // }
  // console.log(form.temperament, 'formtemp');
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(postDog(event))
      const res = await axios.post("http://localhost:3001/dogs/create", form);
      console.log('form res', form, res);
      alert("Se creó correctamente el perro: " + res.data);
      resetForm();
      console.log("res", res.data);


    } catch (err) {
      alert("Hubo un error al crear el perro");
      console.error(err);
    }
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //   if (form.name && form.height && form.image && form.weight && form.life_span && form.temperament) {
  //   await dispatch(getDogsTemp());
  //   const res =
  //   await axios
  //   .post(http://localhost:3001/dogs/, form)
  //   // .then(res=>{alert('Se creo correctamente el perro')
  //   .then((res) => alert('se creo correctamente el perro', res))
  //   resetForm()
  //   console.log('res', res);
  //   }
  //   } catch (err) {
  //   alert(err.message, 'soy error')

  //   }
  //   }

  useEffect(() => {
    dispatch(getDogsTemp());
  }, [dispatch]);


  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={s.formContainer}>
        <h1>Crea tu Perro</h1>

        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          value={form.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        {error.name && <span className={s.error}>{error.name}</span>}

        <label htmlFor="image">Url imagen: </label>
        <input
          type="text"
          value={form.image}
          name="image"
          onChange={(e) => handleChange(e)}
        />
        {error.image && <span className={s.error}>{error.image}</span>}

        <label htmlFor="height">Altura: </label>
        <input
          type="text"
          value={form.height}
          name="height"
          onChange={(e) => handleChange(e)}
        />
        {error.height && <span className={s.error}>{error.height}</span>}

        <label htmlFor="weight">Peso: </label>
        <input
          type="text"
          value={form.weight}
          name="weight"
          onChange={(e) => handleChange(e)}
        />
        {error.weight && <span className={s.error}>{error.weight}</span>}

        <label htmlFor="life_span">Años de vida: </label>
        <input
          type="text"
          value={form.life_span}
          name="life_span"
          onChange={(e) => handleChange(e)}
        />
        {error.life_span && <span className={s.error}>{error.life_span}</span>}
      </div>

      <label className={s.tempContainer} htmlFor="temperament">Temperamentos: </label>
      {error.temperament && <span className={s.error}>{error.temperament}</span>}
      <select name="temperament" id="temperament" onChange={(e) => handleSelect(e)}>
        {dogTemp &&
          dogTemp.map((temp) => (
            <option value={temp.name} key={temp.id}>{temp.name}</option>
          ))}
      </select>
      <ul>{form.temperament.map((temp, index) => (<li key={index}>{temp}</li>))}</ul>
      {/* <label className={s.tempContainer} htmlFor="temperament">
        Temperamentos:{" "}
      </label>
      {error.temperament && <span className={s.error}>{error.temperament}</span>}
      <select name="temperament" id="temperament" onChange={(e) => handleSelect(e)}>
        <option value="">Seleccione un temperamento</option>
        {dogTemp &&
          dogTemp.map((temp) => (
            <option value={temp.name} key={temp.id}>
              {temp.name}
            </option>
          ))}
      </select>
      <ul>
        {selectedTemperaments.map((temp, index) => (
          <li key={index}>{temp}</li>
        ))}
      </ul> */}


      <div className={s.buttonContainer}>
        <button className={s.buton} type="submit">Agregar</button>

        <Link to='/home'><button className={s.buton2}>Volver a Home</button></Link>
      </div>
    </form>
  );
}


export default Form;