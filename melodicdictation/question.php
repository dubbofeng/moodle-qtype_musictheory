<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file defines question and grading strategy classes for music theory
 * question subtypes related to scales.
 *
 * @package    qtype
 * @subpackage musictheory
 * @copyright  2013 Eric Brisson
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

/**
 * The music theory scale writing question subtype.
 *
 * @copyright  2013 Eric Brisson
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_musictheory_melodic_dictation extends qtype_musictheory_question implements qtype_musictheory_subtype {

    public function get_supported_grading_strategies() {
        return array(
            'qtype_musictheory_strategy_all_or_nothing',
            'qtype_musictheory_strategy_all_or_nothing_allow_enharmonic',
            'qtype_musictheory_strategy_scale_creditbynote',
            'qtype_musictheory_strategy_dictation_creditbynote_allow_enharmonic'
        );
    }

    public function get_expected_data() {
        return array('answer' => PARAM_CLEANHTML);
    }

    public function grade_response(array $response) {
        $correctresponse = $this->get_correct_response();
        return $this->gradingstrategy->grade($response, $correctresponse);
    }

    public function get_correct_response() {
        $notes = array();
        if($this->musictheory_numberofnotes > 0){
            for ($i=1; $i <= $this->musictheory_numberofnotes; $i++) { 
                $ltr = $this->{'musictheory_givennote'.$i.'letter'};
                $acc = $this->{'musictheory_givennote'.$i.'accidental'};
                $reg = $this->{'musictheory_givennote'.$i.'register'};
                $note = new Note($ltr, $acc, $reg);
                $notes[] = (string) $note;
            }
        }
        return array('answer' => join(",",$notes));
    }

    public function is_complete_response(array $response) {
        if (!isset($response['answer'])) {
            return false;
        }
        $regex = '/^([A-G](n|\#|b|x|bb)[1-6],){'.($this->musictheory_numberofnotes-1).'}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        return preg_match($regex, $response['answer']);
    }

    public function is_same_response(array $prevresponse, array $newresponse) {
        return question_utils::arrays_same_at_key_missing_is_blank(
                        $prevresponse, $newresponse, 'answer');
    }

    public function summarise_response(array $response) {
        if (!array_key_exists('answer', $response)) {
            return null;
        } else {
            return str_replace(' ', '', $response['answer']);
        }
    }

    public function get_validation_error(array $response) {

        $incompleteregex = '/^([A-G](n|\#|b|x|bb)[1-6],){'.($this->musictheory_numberofnotes-1).'}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        if (empty($response['answer'])) {
            return get_string('validationerror_empty', 'qtype_musictheory');
        } else if (preg_match('/\s/', $response['answer'])) {
            return get_string('validationerror_whitespace', 'qtype_musictheory');
        } else if (preg_match($incompleteregex, $response['answer'])) {
            $stringkey = 'validationerror_melodic_dictation_incomplete';
            return get_string($stringkey, 'qtype_musictheory');
        }
        global $OUTPUT;
        $help = $OUTPUT->help_icon('melodic_dictation_questionastext', 'qtype_musictheory', true);
        return get_string('validationerror_invalidsyntax', 'qtype_musictheory') . $help;
    }

    public function get_question_text() {
        $qtext = get_string('questiontext_melodic_dictation', 'qtype_musictheory');
        return $qtext. '</b>';
    }
}

/**
 * A grading strategy that divides the grade evenly by the number of scale notes the user has
 * to enter, and awards partial grade for each correct note.
 *
 * @copyright  2013 Eric Brisson
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_musictheory_strategy_dictation_creditbynote_allow_enharmonic implements qtype_musictheory_grading_strategy {

    public function grade($response, $correctresponse) {

        $fraction = 0;
        $respnotes = explode(',', $response['answer']);
        $ansnotes = explode(',', $correctresponse['answer']);
        $notepartialfraction = 1 / (count($ansnotes) - 1);
        $note = new Note("C","n",4);
        for ($i = 1; $i < count($respnotes); $i++) {
            $respnote = $note->toNote($respnotes[$i]);
            $ansnote = $note->toNote($ansnotes[$i]);
            if ($respnote->id == $ansnote->id) {
                $fraction += $notepartialfraction;
            }
        }

        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

}

/**
 * A grading strategy that simply checks whether a given response is identical to
 * the correct response. If so, full grade is given to the response - otherwise, a grade
 * of zero is assigned.
 *
 * @copyright  2013 Eric Brisson
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_musictheory_strategy_all_or_nothing_allow_enharmonic implements qtype_musictheory_grading_strategy {

    public function grade($response, $correctresponse) {
        $fraction = 1;
        $respnotes = explode(',', $response['answer']);
        $ansnotes = explode(',', $correctresponse['answer']);
        $note = new Note("C","n",4);
        for ($i = 1; $i < count($respnotes); $i++) {
            $respnote = $note->toNote($respnotes[$i]);
            $ansnote = $note->toNote($ansnotes[$i]);
            if ($respnote->id != $ansnote->id) {
                $fraction = 0;
            }
        }
        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

}
