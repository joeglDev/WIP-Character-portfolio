const CharDetails = ({charDetails, isOpenState } : any) => {
const {name} = charDetails
if  (isOpenState === true) {
return (
    <section className="CharDetails__card">
        <h3>{name}</h3>
        <div>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
            <p>Age: {}</p>
        </div>
    </section>
)
} else {return <></>}  
};

export default CharDetails;