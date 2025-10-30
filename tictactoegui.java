import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TicTacToeGUI {
    private JFrame frame;
    private JButton[] buttons = new JButton[9];
    private char currentPlayer = 'X';

    public static void main(String[] args) {
        SwingUtilities.invokeLater(TicTacToeGUI::new);
    }

    public TicTacToeGUI() {
        frame = new JFrame("Tic-Tac-Toe");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 400);
        frame.setLayout(new GridLayout(3, 3));

        initializeButtons();

        frame.setVisible(true);
    }

    private void initializeButtons() {
        for (int i = 0; i < 9; i++) {
            buttons[i] = new JButton("");
            buttons[i].setFont(new Font("Arial", Font.BOLD, 60));
            buttons[i].setFocusPainted(false);
            buttons[i].addActionListener(new ButtonClickListener(i));
            frame.add(buttons[i]);
        }
    }

    private void resetGame() {
        for (JButton button : buttons) {
            button.setText("");
            button.setEnabled(true);
        }
        currentPlayer = 'X';
    }

    private boolean checkWinner() {
        int[][] winPatterns = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // Rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // Columns
            {0, 4, 8}, {2, 4, 6}             // Diagonals
        };

        for (int[] pattern : winPatterns) {
            if (!buttons[pattern[0]].getText().isEmpty() &&
                buttons[pattern[0]].getText().equals(buttons[pattern[1]].getText()) &&
                buttons[pattern[1]].getText().equals(buttons[pattern[2]].getText())) {
                return true;
            }
        }
        return false;
    }

    private boolean isBoardFull() {
        for (JButton button : buttons) {
            if (button.getText().isEmpty()) return false;
        }
        return true;
    }

    private class ButtonClickListener implements ActionListener {
        private final int index;

        public ButtonClickListener(int index) {
            this.index = index;
        }

        @Override
        public void actionPerformed(ActionEvent e) {
            buttons[index].setText(String.valueOf(currentPlayer));
            buttons[index].setEnabled(false);

            if (checkWinner()) {
                JOptionPane.showMessageDialog(frame, "Player " + currentPlayer + " wins!");
                resetGame();
            } else if (isBoardFull()) {
                JOptionPane.showMessageDialog(frame, "It's a draw!");
                resetGame();
            } else {
                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            }
        }
    }
}
