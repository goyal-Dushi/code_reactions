import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NotesSection from "./modules/Notes.module";
import SubjectSection from "./modules/Subject.module";
import TopicSection from "./modules/Topics.module";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={SubjectSection} />
        <Route path={"/subject/:paramID"} component={TopicSection} />
        <Route path={"/topics/:subjectID/:topicID"} component={NotesSection} />
      </Switch>
    </Router>
  );
}

export default App;
