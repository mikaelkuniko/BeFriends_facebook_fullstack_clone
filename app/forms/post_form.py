from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class PostForm(FlaskForm):
    post_text = StringField('post text', validators=[DataRequired()])
    submit = SubmitField('submit')
