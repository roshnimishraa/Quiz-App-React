import logoImg from "../assets/quiz-logo.png"
export default function Header(){
    return <header>
        <img src={logoImg} alt="Quiz Logo" />
        <h1>Questify</h1>

    </header>
}