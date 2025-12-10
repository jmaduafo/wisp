import { jsx as _jsx } from "react/jsx-runtime";
import Paragraph from '@/components/ui/headings/Paragraph';
import Loader from '@/components/ui/loading/Loader';
import Widget from '@/components/ui/widget/Widget';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
function Quiz() {
    const [data, setData] = useState();
    const api_url = "https://opentdb.com/api.php?amount=1&type=multiple";
    const { userData } = useAuth();
    async function getAPI() {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            if (!data) {
                return;
            }
            const data_obj = data.results[0];
            setData(data_obj);
            console.log(data_obj);
            const answers = [...data_obj.incorrect_answers];
            answers.splice(Math.round(Math.random() * data_obj.incorrect_answers?.length), 0, data_obj.correct_answer);
            console.log(answers);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getAPI();
    }, []);
    return (_jsx(Widget, { children: data ?
            _jsx("div", { children: _jsx(Paragraph, { text: data.question }) })
            :
                _jsx(Loader, {}) }));
}
export default Quiz;
