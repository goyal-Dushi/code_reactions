import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NotesSection from "./modules/Notes.module";
import SubjectSection from "./modules/Subject.module";
import TopicSection from "./modules/Topics.module";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <Route path={"/"} exact component={SubjectSection} />
          <Route path={"/subject/:paramID"} component={TopicSection} />
          <Route
            path={"/topics/:subjectID/:topicID"}
            component={NotesSection}
          />
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
