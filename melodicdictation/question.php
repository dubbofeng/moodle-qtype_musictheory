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
            'qtype_musictheory_strategy_scale_creditbynote'
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

        $ltr = $this->musictheory_givennoteletter;
        $acc = $this->musictheory_givennoteaccidental;
        $reg = $this->musictheory_givennoteregister;
        $tonic = new Note($ltr, $acc, $reg);
        $scale = null;
        switch ($this->musictheory_scaletype) {
            case 'natural':
                $scale = new NaturalMinorScale($tonic);
                break;
            case 'harmonic':
                $scale = new HarmonicMinorScale($tonic);
                break;
            case 'melodic':
                $scale = new MelodicMinorScale($tonic);
                break;
            default:
                $scale = new MajorScale($tonic);
        }

        return array('answer' => (string) $scale);
    }

    public function is_complete_response(array $response) {
        if (!isset($response['answer'])) {
            return false;
        }
        if ($this->musictheory_scaletype == 'melodic') {
            $regex = '/^([A-G](n|\#|b|x|bb)[1-6],){14}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        } else {
            $regex = '/^([A-G](n|\#|b|x|bb)[1-6],){7}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        }
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
        if ($this->musictheory_scaletype == 'melodic') {
            $incompleteregex = '/^(([A-G](n|\#|b|x|bb)[1-6])?,?){0,15}$/';
            $incompleteregex2 = '/^(([A-G](n|\#|b|x|bb)[1-6]),){0,13}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        } else {
            $incompleteregex = '/^(([A-G](n|\#|b|x|bb)[1-6])?,?){0,8}$/';
            $incompleteregex2 = '/^(([A-G](n|\#|b|x|bb)[1-6]),){0,6}([A-G](n|\#|b|x|bb)[1-6]){1}$/';
        }

        if (empty($response['answer'])) {
            return get_string('validationerror_empty', 'qtype_musictheory');
        } else if (preg_match('/\s/', $response['answer'])) {
            return get_string('validationerror_whitespace', 'qtype_musictheory');
        } else if (preg_match($incompleteregex, $response['answer']) ||
                preg_match($incompleteregex2, $response['answer'])) {
            $stringkey = ($this->musictheory_scaletype == 'melodic') ?
                    'validationerror_scale_incomplete_melodic' :
                    'validationerror_scale_incomplete';
            return get_string($stringkey, 'qtype_musictheory');
        }
        global $OUTPUT;
        $help = $OUTPUT->help_icon('melodic_dictation_questionastext', 'qtype_musictheory', true);
        return get_string('validationerror_invalidsyntax', 'qtype_musictheory') . $help;
    }

    public function get_question_text() {
        if ($this->musictheory_scaletype == 'melodic') {
            $qtext = get_string('questiontext_melodic_dictation_melodic', 'qtype_musictheory');
        } else {
            $qtext = get_string('questiontext_melodic_dictation', 'qtype_musictheory');
        }
        switch ($this->musictheory_givennoteaccidental) {
            case 'n':
                $acc = '';
                break;
            case 'b':
            case 'x':
            case 'bb':
                $acc = get_string('acc_' . $this->musictheory_givennoteaccidental, 'qtype_musictheory');
                break;
            case '#':
                $acc = get_string('acc_sharp', 'qtype_musictheory');
                break;
        }
        $scale = get_string('note' . strtolower($this->musictheory_givennoteletter), 'qtype_musictheory');
        $scale .= $acc;
        $scale .= ' ' . get_string('scaletype_' . $this->musictheory_scaletype, 'qtype_musictheory');
        return $qtext . ': <b>' . $scale . '</b>';
    }

}

/**
 * A grading strategy that divides the grade evenly by the number of scale notes the user has
 * to enter, and awards partial grade for each correct note.
 *
 * @copyright  2013 Eric Brisson
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_musictheory_strategy_dictation_creditbynote implements qtype_musictheory_grading_strategy {

    public function grade($response, $correctresponse) {

        $fraction = 0;

        $respnotes = explode(',', $response['answer']);
        $ansnotes = explode(',', $correctresponse['answer']);

        $notepartialfraction = 1 / (count($ansnotes) - 1);

        for ($i = 1; $i < count($respnotes); $i++) {
            if ($respnotes[$i] == $ansnotes[$i]) {
                $fraction += $notepartialfraction;
            }
        }

        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

}
