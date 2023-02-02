from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class CommentForm(FlaskForm):
    comment_text = StringField('post text', validators=[DataRequired()])
    submit = SubmitField('submit')
