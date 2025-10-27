export default function Formations(){
    return(
        <>
            <h2>Formations</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche de formation"/>
                <button>Ajouter une formation</button>
            </div>
            <ul className="formations">
                <li className="titles">
                    <ul>
                        <li className="title">Titres</li>
                        <li className="description">Descriptions</li>
                        <li className="addDate">Date d'ajout</li>
                        <li className="publicationDate">Date de publication</li>
                        <li className="published">Publiée</li>
                    </ul>
                </li>
                <li>
                    <ul className="formation">
                        <li className="title">
                            <h5>Bases du HTML et CSS</h5>
                        </li>
                        <li  className="description">
                            <p>Cette formation apprend aux débutants les bases du HTML et CSS.</p>
                        </li>
                        <li  className="addDate">
                            <p>27 Octobre 2025 à 16:49</p>
                        </li>
                        <li className="publicationDate">
                            <p>29 Octobre 2025 à 8:12</p>
                        </li>
                        <li className="published">
                            <div className="badge">
                                <p>oui</p>
                            </div>
                            {/* <div className="badge">
                                <p>non</p>
                            </div> */}
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="formation">
                        <li className="title">
                            <h5>Bases du HTML et CSS</h5>
                        </li>
                        <li  className="description">
                            <p>Cette formation apprend aux débutants les bases du HTML et CSS.</p>
                        </li>
                        <li  className="addDate">
                            <p>27 Octobre 2025 à 16:49</p>
                        </li>
                        <li className="publicationDate">
                            <p>29 Octobre 2025 à 8:12</p>
                        </li>
                        <li className="published">
                            <div className="badge">
                                <p>oui</p>
                            </div>
                            {/* <div className="badge">
                                <p>non</p>
                            </div> */}
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="formation">
                        <li className="title">
                            <h5>Bases du HTML et CSS</h5>
                        </li>
                        <li  className="description">
                            <p>Cette formation apprend aux débutants les bases du HTML et CSS.</p>
                        </li>
                        <li  className="addDate">
                            <p>27 Octobre 2025 à 16:49</p>
                        </li>
                        <li className="publicationDate">
                            <p>29 Octobre 2025 à 8:12</p>
                        </li>
                        <li className="published">
                            <div className="badge">
                                <p>oui</p>
                            </div>
                            {/* <div className="badge">
                                <p>non</p>
                            </div> */}
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}