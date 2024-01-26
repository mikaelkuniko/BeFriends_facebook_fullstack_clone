from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class CommentForm(FlaskForm):
    comment_text = StringField('comment text', validators=[DataRequired()])
    post_id = IntegerField('Post id', validators=[DataRequired()])
    submit = SubmitField('submit')
