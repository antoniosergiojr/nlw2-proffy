import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/68964350?s=460&u=52edde890da4b4f299da003e0852359e0ebc280e&v=4" alt="Antônio Sérgio Jr." />
                <div>
                    <strong>Antônio Sérgio jr.</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Lorem ipsum semper risus nostra mi aliquam pellentesque dictum felis sapien placerat morbi et,
                lacus enim vivamus sit pellentesque lacus praesent nisl habitasse accumsan metus. est ad mauris
                adipiscing posuere imperdiet ullamcorper integer leo dui sem aenean, praesent curae bibendum
                suscipit nisi suspendisse odio turpis egestas.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;