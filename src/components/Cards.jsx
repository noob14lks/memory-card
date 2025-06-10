function Cards({ shuffleImages, onClick }){
    return(
    <div className="cards">
        {
            shuffleImages.map((image, index) => (
                <img key = {index} src={image} alt="flag" onClick={() => onClick(image)}/>
            ))
        }
    </div>
    );
}

export { Cards };