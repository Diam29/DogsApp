import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsTemp } from '../../redux/actions';
import axios from "axios";
import { Link } from "react-router-dom";
import s from './Form.module.css'

const Form = () => {
  const dispatch = useDispatch();
  const dogTemp = useSelector((state) => state.dogTemp);

  const [form, setForm] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: [],
  });

  const [error, setError] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: [],
  });

  const validate = (form) => {
    const regexImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

    let error = {}

    form.name ? error.name = '' : error.name = 'Este campo es obligatorio';
    regexImg.test(form.image) ? error.image = '' : error.image = 'La url no es valida';
    form.height ? error.height = '' : error.height = 'Es obligatorio indicar altura';
    form.weight ? error.weight = '' : error.weight = 'Es obligatorio el peso';
    form.life_span ? error.life_span = '' : error.life_span = 'Debe indicar años';
    form.temperament ? error.temperament = [] : error.temperament = 'Debe ingresar un teperamento';

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError(validate({...form, [name]: value}));
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (event) => {
    setForm({ ...form, temperament: [...form.temperament, event.target.value] });
  };

  const resetForm = ()=>{
    setForm({
      name: '',
      image: '',
      height: '',
      weight: '',
      life_span: '',
      temperament: [],
    })
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    if(form.name && form.height && form.image && form.weight && form.life_span && form.temperament){
    axios
      .post('http://localhost:3001/dogs', form)
      .then(res=>{alert('Se creo correctamente el perro')
      resetForm()
    })
      
      .catch(err=> alert(err, 'No se pudo crear el perro'))
      
    }else{
      alert('No se puede enviar el formulario porque hay campos faltantes')
    }
}


  useEffect(() => {
    dispatch(getDogsTemp());
  }, [dispatch]);

  
  return (
    <form  onSubmit={(e) => handleSubmit(e)}>
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
        <ul>{form.temperament.map((temp, index)=> (<li key={index}>{temp}</li>))}</ul>
        
        
        
        <div className={s.buttonContainer}>
        <button className={s.buton} type="submit">Agregar</button>
      
      <Link to='/home'><button className={s.buton2}>Volver a Home</button></Link>
      </div>
    </form>
  );
};

export default Form;